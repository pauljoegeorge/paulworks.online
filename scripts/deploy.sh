#!/usr/bin/env bash
set -euo pipefail
: "${S3_BUCKET:?Set S3_BUCKET privately before deploying}"
npm run build
aws s3 sync build/ "s3://${S3_BUCKET}/" --cache-control 'public,max-age=0,must-revalidate'
if [[ -n "${CLOUDFRONT_DISTRIBUTION_ID:-}" ]]; then
  aws cloudfront create-invalidation --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" --paths '/*'
fi
