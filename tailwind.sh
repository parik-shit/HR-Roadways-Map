echo "Setting up Tailwind configuration..."
npx tailwindcss init

# Step 4: Install PostCSS and Autoprefixer
echo "Installing PostCSS and Autoprefixer..."
npm install postcss-cli autoprefixer

# Step 5: Create PostCSS configuration
echo "Creating PostCSS configuration..."
cat <<EOF > postcss.config.js
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}
EOF

# Step 6: Import Tailwind CSS in index.css
echo "Importing Tailwind CSS in index.css..."
cat <<EOF > src/index.css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
EOF

echo "Tailwind CSS setup complete!"