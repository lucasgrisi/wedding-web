#!/bin/bash

npm run build

aws s3 rm --recursive s3://marialeticiaediogo.com/ --profile lucasgrisiq
aws s3 cp build/ s3://marialeticiaediogo.com/ --recursive --profile lucasgrisiq

# aws cloudfront create-invalidation --distribution-id E2DOGOJQL15J6M --paths "/*" --profile lucasgrisiq