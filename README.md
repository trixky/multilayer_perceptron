Implementation of an customizable [online](https://multilayer-perceptron.trixky.com/) [multilayer-perceptron](https://en.wikipedia.org/wiki/Multilayer_perceptron) used to diagnose cancers.
Using the notions of [activation function](https://en.wikipedia.org/wiki/Activation_function), [backpropagation](https://en.wikipedia.org/wiki/Backpropagation) and [gradient descent](https://en.wikipedia.org/wiki/Gradient_descent).

The goal is to train an AI model to predict whether a cancer is malignant or benign on a dataset of breast cancer diagnosis in the Wisconsin.

Dataset describe the (30) characteristics of a cell nucleus of breast mass extracted with fine-needle aspiration (FNA) on 569 patients.

<img src="https://github.com/trixky/gpgm/blob/main/.demo/screenshots.gif" alt="Demo gif" width="400"/>

## Prerequisites

- docker-compose

## Up

### Dev

```bash
cp .env.example .env
docker compose up -d
# add the --build argument if a package is added or the environment changes
# localhost:3223
```

### Production

```bash
cp .env.example .env
docker compose -f docker-compose.prod.yml up -d
# localhost:3223
```

## Online

This project is [online](https://multilayer-perceptron.trixky.com/)!

## Stack

- Svelte
- Tailwind
- Chart.js