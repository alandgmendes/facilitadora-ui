#!/bin/bash

# Find all JavaScript files recursively and process them
find . -type f -name "*.js" -print0 | xargs -0 bash -c '
for file; do
  # Check if the file includes JSX
  if grep -q "import React" "$file" || grep -q "JSX" "$file"; then
    # Rename to .tsx if JSX is present
    mv "$file" "${file%.js}.tsx"
    echo "Renamed $file to ${file%.js}.tsx"
  else
    # Rename to .ts if no JSX is present
    mv "$file" "${file%.js}.ts"
    echo "Renamed $file to ${file%.js}.ts"
  fi
done
' bash

echo "File renaming completed."



