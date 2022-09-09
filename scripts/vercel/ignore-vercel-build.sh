#!/bin/bash

# Force build based on environment variables
if [ "$FORCE_BUILD" = true ]; then
  echo "🔨 Ignore NX check, force build."
  exit 1;
fi

function title() {
  RCol='\e[0m'    # Text Reset
  On_IRed='\e[0;101m';

  TITLE="$1"

  echo ""
  echo ""
  echo "· RUNNING ·  $TITLE"
  echo ""
}

# Getting available arguments
args=(
  $1
  $2
  $3
  $4
  $5
)

  # Defining default values which doesn't conflict with arg position
defaultArgs=(
  # The Target App that should be compared
  "${6:---target=null}"
  # Whether we should skip the installation for the NX CLI - Useful for local dev.
  "${7:---skip-install=false}"
  # Whether we should skip verifying whether the NX CLI is set up and working
  "${8:---skip-verify=false}"
  # Whether there should be verbose logging
  "${9:---verbose=false}"
  # If want to compare against $VERCEL_ENV
  "${10:---env=false}"
)

combinedArgs=("${args[@]}" "${defaultArgs[@]}")

#
#
# Verbose
#
#
EXEC_VERBOSE=false

for arg in "${combinedArgs[@]}"
do
  if [[ "$arg" =~ "--verbose" && $EXEC_VERBOSE != true ]]; then
    EXEC_VERBOSE=true

    if [[ "$arg" == "--verbose=true" || "$arg" == '--verbose' ]]; then
      title "Verbose"

      echo "----------------------------"
      echo "VERBOSE:"
      echo "- VERCEL_ENV": $VERCEL_ENV
      echo "- VERCEL_URL": $VERCEL_URL
      echo "- VERCEL_REGION": $VERCEL_REGION
      echo "----------------------------"
      echo "ARGUMENTS:"
      for i in "${args[@]}"
      do
        echo "- ${i/\--/}"
      done
      echo "----------------------------"
    fi
  fi
done

#
#
# Installation
#
#
title "Installation"

EXEC_SKIP_INSTALL=false

for arg in "${combinedArgs[@]}"
do
  if [[ "$arg" =~ "--skip-install" && $EXEC_SKIP_INSTALL != true ]]; then
    EXEC_SKIP_INSTALL=true

    if [[ "$arg" == "--skip-install=true" || "$arg" == '--skip-install' ]]; then
      echo "✅  Skipping installation"
    else
			# Determine version of Nx installed
			NX_VERSION=$(node -e "console.log(require('./package.json').devDependencies['@nrwl/workspace'])")
			TS_VERSION=$(node -e "console.log(require('./package.json').devDependencies['typescript'])")

			npm install -D @nrwl/workspace@$NX_VERSION typescript@$TS_VERSION --prefer-offline --no-package-lock --no-save

      echo "✅  Installation was succesful"
    fi
  fi
done

#
#
# Verify
#
#
title "Verify"

EXEC_SKIP_VERIFY=false

for arg in "${combinedArgs[@]}"
do
  if [[ "$arg" =~ "--skip-verify" && $EXEC_SKIP_VERIFY != true ]]; then
    EXEC_SKIP_VERIFY=true

    if [[ "$arg" == "--skip-verify=true" || "$arg" == '--skip-verify' ]]; then
      echo "✅  Skipping verify"
    else
      # Run the affected command, comparing latest commit to the one before that
      if npx nx affected:apps --plain --base HEAD~1 --head HEAD &> /dev/null; then
        echo "✅  NX Workspace ready"
      else
        echo "🛑  Command not found"
        echo "    Run the following command:"
        echo ""
        echo "    $ yarn install"
        exit 0
      fi
    fi
  fi
done

#
#
# Environment
#
#
title "Environment"

EXEC_ENV=false

for arg in "${combinedArgs[@]}"
do
  if [[ "$arg" =~ "--env" && $EXEC_ENV != true ]]; then
    EXEC_ENV=true

    if [[ "$arg" == "--env=false" ]]; then
      echo "✅  Skipping environment check"
    else
      ENV=${arg/\--env=/}

      if [[ "$VERCEL_ENV" == "$ENV" ]] ; then
        # Proceed with the build
        echo "✅  The environment matched"
        echo ""
      else
        # Don't build
        echo "🛑  The environment variable don't match"
        echo ""
        echo "    >>> Expected $ENV, but received $VERCEL_ENV <<<"
        exit 0;
      fi
    fi
  fi
done

#
#
# Target
#
#
title "Target"

EXEC_TARGET=false

for arg in "${combinedArgs[@]}"
do
  if [[ "$arg" =~ "--target" && $EXEC_TARGET != true ]]; then
    EXEC_TARGET=true
    TARGET=${arg/\--target=/}


    if [[ "$TARGET" == 'null' ]]; then
      echo "🛑  A --target is required but wasn't passed"
      echo "    Please set the target to whatever app you want to compare (e.g. --target=web)"
      echo ""
      exit 0
    fi

    AFFECTED=$(npx nx affected:apps --plain --base HEAD~1 --head HEAD --runner=ci)

    for arg in "${combinedArgs[@]}"
    do
      if [[ "$arg" == "--verbose=true" || "$arg" == '--verbose' ]]; then

        echo "----------------------------"
        echo "VERBOSE:"
        echo "- TARGET": $TARGET
        echo "- AFFECTED": $AFFECTED
        echo "----------------------------"
      fi
    done

    echo $AFFECTED | grep $TARGET -q

    IS_AFFECTED=$?

    if [ $IS_AFFECTED != 0 ]; then
      echo "🛑  Not Affected - \"$TARGET\" has not been affected - - Build cancelled"
      echo ""
      exit 0
    else
      echo "✅  Affected - \"$TARGET\" has been affected - Build proceeds"
      echo ""
      exit 1
    fi
  fi
done

