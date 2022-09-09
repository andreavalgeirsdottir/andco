FILE=../../sanity.json

if [ -f "$FILE" ]; then
	echo "Symlink for 'sanity.json' already exists."
else
  cd ../../
	ln -s apps/studio/sanity.json ./sanity.json

	echo "Symlink created from 'apps/studio/sanity.json' to 'sanity.json'"
fi

