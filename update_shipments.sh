#!/bin/bash

# Update the shipments.json file
echo '[{"id": 1, "status": "shipped"}]' > /workspaces/aquavinci/shipments.json

# Stage the changes
git add /workspaces/aquavinci/shipments.json

# Leave the changes uncommitted for review
echo "Changes have been staged but not committed."
