<script setup>
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

const xs = [1, 2, 3, 4];
const ys = [1, 3, 5, 7];

const run = async () => {
  tfvis.render.scatterplot(
    {
      name: "线性回归集",
    },
    {
      values: xs.map((x, i) => ({
        x,
        y: ys[i],
      })),
    },
    {
      xAxisDomain: [0, 5],
      yAxisDomain: [0, 8],
    }
  );

  const model = tf.sequential();
  model.add(
    tf.layers.dense({
      units: 1,
      inputShape: [1],
    })
  );
  model.compile({
    loss: tf.losses.meanSquaredError,
    optimizer: tf.train.sgd(0.05),
  });

  const inputs = tf.tensor(xs);
  const labels = tf.tensor(ys);
  await model.fit(inputs, labels, {
    batchSize: 2,
    // 迭代次数
    epochs: 50,
    callbacks: tfvis.show.fitCallbacks(
      {
        name: "训练过程",
      },
      ["loss"]
    ),
  });
};

run()
</script>
<template>linear-regression</template>
