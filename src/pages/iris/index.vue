<template>
  <el-button type="primary" @click="training">训练</el-button>

  <el-divider />
  <el-row>预测</el-row>
  <el-row>
    <el-col :span="4"> 花萼长度: </el-col>
    <el-col :span="20">
      <el-input v-model="w" placeholder="输入花萼长度"
    /></el-col>
  </el-row>
  <el-row>
    <el-col :span="4"> 花萼宽度: </el-col>
    <el-col :span="20">
      <el-input v-model="h" placeholder="输入花萼宽度"
    /></el-col>
  </el-row>
  <el-row>
    <el-col :span="4"> 花瓣长度: </el-col>
    <el-col :span="20">
      <el-input v-model="fw" placeholder="输入花瓣长度"
    /></el-col>
  </el-row>
  <el-row>
    <el-col :span="4"> 花瓣宽度: </el-col>
    <el-col :span="20">
      <el-input v-model="fh" placeholder="输入花瓣宽度"
    /></el-col>
  </el-row>
  <el-button type="primary" @click="predict">预测</el-button>
  <div>预测结果: {{ result }}</div>
</template>
<script setup>
import { ref } from "vue";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { getIrisData, IRIS_CLASSES } from "./data";

const [xTrain, yTrain, xTest, yTest] = getIrisData(0.15);

const model = tf.sequential();

model.add(
  tf.layers.dense({
    units: 10,
    // inputShape: [4],
    inputShape: [xTrain.shape[1]],
    activation: "sigmoid",
  })
);

// 多分类核心
model.add(
  tf.layers.dense({
    // units: 3,
    units: IRIS_CLASSES.length,
    activation: "softmax",
  })
);

model.compile({
  loss: "categoricalCrossentropy",
  optimizer: tf.train.adam(0.1),
  metrics: ["accuracy"],
});

const training = async () => {
  await model.fit(xTrain, yTrain, {
    epochs: 100,
    validationData: [xTest, yTest],
    callbacks: tfvis.show.fitCallbacks(
      {
        name: "训练效果",
      },
      ["loss", "val_loss", "acc", "val_acc"],
      {
        callbacks: ["onEpochEnd"],
      }
    ),
  });
};

const w = ref("");
const h = ref("");
const fw = ref("");
const fh = ref("");
const result = ref("");

const predict = () => {
  const userInputs = [
    Number(w.value),
    Number(h.value),
    Number(fw.value),
    Number(fh.value),
  ];
  console.log(userInputs)
  const input = tf.tensor([userInputs]);

  const pred = model.predict(input);
  console.log(pred.argMax(1).dataSync()[0])
  result.value = IRIS_CLASSES[pred.argMax(1).dataSync()[0]];
};
</script>
