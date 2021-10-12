<script setup>
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

import { ref } from "vue";

const heights = [150, 160, 170];
const weights = [40, 50, 60];

const model = tf.sequential();

const train = async () => {
  tfvis.render.scatterplot(
    { name: "身高体重" },
    { values: heights.map((x, i) => ({ x, y: weights[i] })) },
    { xAxisDomain: [140, 180], yAxisDomain: [30, 70] }
  );

  const inputs = tf.tensor(heights).sub(150).div(20);
  const labels = tf.tensor(weights).sub(40).div(20);

  model.add(
    tf.layers.dense({
      units: 1,
      inputShape: [1],
    })
  );
  model.compile({
    loss: tf.losses.meanSquaredError,
    optimizer: tf.train.sgd(0.1),
  });

  await model.fit(inputs, labels, {
    batchSize: 3,
    // 迭代次数
    epochs: 100,
    callbacks: tfvis.show.fitCallbacks(
      {
        name: "训练过程",
      },
      ["loss"]
    ),
  });
};

train();

let inputValue = ref(0);
let result = ref(0);
const onInputChange = (e) => {
  inputValue.value = e.target.value;
};

const predict = () => {
  const input = Number(inputValue.value);

  const output = model.predict(tf.tensor([input]).sub(150).div(20));

  result.value = output.mul(20).add(40).dataSync()[0];
};
</script>

<template>
  <input type="text" :value="inputValue" @change="onInputChange" />
  <button @click="predict">预测</button>
  <div>预测结果：{{ result }}</div>
</template>
