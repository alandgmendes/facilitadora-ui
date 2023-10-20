#!/bin/bash

list_files() {
    local directory="$1"

    if [ -d "$directory" ]; then
        echo "Directory: $directory"

        # Loop through files and subdirectories
        for entry in "$directory"/*; do
            if [ -d "$entry" ]; then
                # If it's a directory, recursively call the function
                list_files "$entry"
            else
                # If it's a file, print the file name
                echo "File: $(basename "$entry")"
            fi
        done
    else
        echo "The directory '$directory' does not exist."
    fi
}

# Replace "src" with your actual folder name
list_files "src"