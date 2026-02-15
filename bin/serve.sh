#!/bin/bash


PORT=4000

if [ -n "$1" ]
then
    PORT=$1
fi

php -S 0.0.0.0:$PORT

