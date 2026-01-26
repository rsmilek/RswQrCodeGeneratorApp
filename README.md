# RswQrCodeGeneratorApp

A modern QR code generator application built with Angular that allows users to create QR codes for various purposes. The app provides an intuitive interface for generating three types of QR codes:

- **Web Link QR Codes** - Generate QR codes for URLs and web links
- **Email QR Codes** - Create QR codes that open email clients with pre-filled recipient addresses
- **CZ Bank Account Payment QR Codes** - Generate payment QR codes for Czech bank accounts (following Czech banking standards)

## Platform Support

The app is built as a cross-platform solution:
- **Web Application** - Runs in modern web browsers
- **Mobile Application** - Extended with Capacitor to run natively on Android devices

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 20.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

### Web Build

Run `ng build` to build the project for web deployment. The build artifacts will be stored in the `dist/` directory.

### Android Mobile Build

1. First, build the Angular app:
   ```bash
   ng build
   ```

2. Sync the web assets with Capacitor:
   ```bash
   npx cap sync android
   ```

3. Open the project in Android Studio:
   ```bash
   npx cap open android
   ```

4. Build and run the Android app from Android Studio, or use:
   ```bash
   npx cap run android
   ```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
