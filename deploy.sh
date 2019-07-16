#!/bin/bash
npm run build
gsutil rm -r gs://jzachb-demos/quick-sort
gsutil rsync -r ./build  gs://jzachb-demos/quick-sort/
