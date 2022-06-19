#!/bin/bash
set -e

python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pip install "jax[cuda11_cudnn82]" -f https://storage.googleapis.com/jax-releases/jax_cuda_releases.html
