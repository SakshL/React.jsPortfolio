# Node.js 22 Migration Guide

## Changes Made

### 1. Node.js Version Update
- Updated from Node.js 18 to Node.js 22
- Added `.nvmrc` file to specify Node.js version
- Updated `engines` field in package.json

### 2. Package Updates

#### Major Framework Updates
- **Next.js**: 13.4.19 → 15.0.3
- **React**: 18.2.0 → 18.3.1
- **ESLint**: 8.48.0 → 9.12.0
- **TypeScript**: 5.2.2 → 5.6.2

#### UI Library Updates
- **@headlessui/react**: 1.7.17 → 2.1.8
- **@heroicons/react**: 2.0.18 → 2.1.5
- **TailwindCSS**: 3.3.3 → 3.4.13

#### Build Tool Updates
- **PNPM**: 8.7.3 → 9.12.1
- **PostCSS**: 8.4.29 → 8.4.47
- **Prettier**: 3.0.3 → 3.3.3

### 3. Configuration Updates

#### Next.js Configuration
- Added package import optimizations for better performance
- Updated experimental features for Next.js 15

#### ESLint Configuration
- Updated to support ESLint 9
- Updated environment settings to ES2022

#### Vercel Configuration
- Added Node.js 22 runtime specification

#### Scripts Update
- Added `cross-env` for cross-platform environment variable support

### 4. Breaking Changes to Watch

#### Next.js 15 Breaking Changes
- Updated Link component behavior
- New App Router improvements
- Updated image optimization

#### React 18.3+ Updates
- Concurrent features improvements
- Better Suspense handling

## Next Steps

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Update Node.js**
   ```bash
   nvm use 22
   # or
   nvm install 22
   nvm use 22
   ```

3. **Test the Application**
   ```bash
   pnpm dev
   ```

4. **Run Linting**
   ```bash
   pnpm lint:fix
   ```

5. **Test Build Process**
   ```bash
   pnpm build
   ```

## Potential Issues & Solutions

### 1. ContentLayer Compatibility
- ContentLayer may need updates for Next.js 15
- Monitor for any MDX processing issues

### 2. ESLint Migration
- Some ESLint rules may need adjustment
- Consider migrating to flat config in the future

### 3. Theme Provider Issues
- Next-themes may need configuration updates
- Test theme switching functionality

### 4. Image Optimization
- Sharp has been updated - test image processing
- Verify all image formats work correctly

## Testing Checklist

- [ ] Homepage loads correctly
- [ ] Blog posts render properly
- [ ] Photography gallery works
- [ ] Contact form functions
- [ ] GitHub API integration works
- [ ] Theme switching operates
- [ ] Mobile navigation functions
- [ ] Build process completes
- [ ] Deployment to Vercel succeeds

## Performance Benefits

With Node.js 22 and updated packages, you should see:
- Improved build times
- Better runtime performance
- Enhanced memory usage
- Faster cold starts
- Better tree-shaking in Next.js 15
