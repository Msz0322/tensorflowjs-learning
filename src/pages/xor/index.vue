<template>
  <el-row>训练</el-row>
  <el-button type="primary" @click="training">训练</el-button>

  <el-divider />
  <el-row>预测</el-row>
  <el-row>
    <el-col :span="2"> x: </el-col>
    <el-col :span="20">
      <el-input v-model="inputX" placeholder="输入x"
    /></el-col>
  </el-row>
  <el-row>
    <el-col :span="2"> y: </el-col>
    <el-col :span="20">
      <el-input v-model="inputY" placeholder="输入y"
    /></el-col>
  </el-row>
  <el-button type="primary" @click="predict">预测</el-button>
  <div>预测结果: {{ result > 0.5 ? "蓝色" : "橙色" }}</div>
  <div>{{ result }}</div>
</template>

<script setup>
import { ref } from "vue";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { getData } from "./data";

const data = getData(400);

tfvis.render.scatterplot(
  {
    name: "XOR 训练数据",
  },
  {
    values: [
      data.filter((p) => p.label === 1),
      data.filter((p) => p.label === 0),
    ],
  }
);

const model = tf.sequential();

// 添加层

// 隐藏层
model.add(
  tf.layers.dense({
    units: 4, // 4较稳定
    inputShape: [2],
    activation: "relu", // 重点！非线形
  })
);

// 输出层
model.add(
  tf.layers.dense({
    units: 1,
    activation: "sigmoid", // 输出0-1
  })
);

model.compile({ loss: tf.losses.logLoss, optimizer: tf.train.adam(0.1) });

const training = async () => {
  const inputs = tf.tensor(data.map((p) => [p.x, p.y]));
  const labels = tf.tensor(data.map((p) => p.label));

  await model.fit(inputs, labels, {
    batchSize: 40,
    epochs: 50,
    callbacks: tfvis.show.fitCallbacks(
      {
        name: "训练过程",
      },
      ["loss"]
    ),
  });
};

const predict = () => {
  const x = Number(inputX.value);
  const y = Number(inputY.value);
  const pred = model.predict(tf.tensor([[x, y]]));

  result.value = pred.dataSync()[0];
};

const inputX = ref("");
const inputY = ref("");
const result = ref("");
</script>
