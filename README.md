# BIP39/English Recovery Seed Words Translator

![2024-05-21_20-26-21-ezgif com-video-to-gif-converter](https://github.com/vietnguyengit/en-bip39-translator/assets/26201635/7dfe4c8a-3e9e-4552-8015-8ea0665ccf23)

### Building and Running the Docker Container

#### Using Docker

1. Clone the repository:

    ```sh
    git clone https://github.com/vietnguyengit/en-bip39-translator.git
    cd en-bip39-translator
    ```

2. Build the Docker image:

    ```sh
    docker build -t bip39-translator .
    ```

3. Run the Docker container in detached mode:

    ```sh
    docker run -d -p 8080:8080 bip39-translator
    ```

4. Open your browser and navigate to `http://localhost:8080` to see the running application.

#### Using Docker Compose

1. Clone the repository:

    ```sh
    git clone https://github.com/vietnguyengit/en-bip39-translator.git
    cd en-bip39-translator
    ```

2. Build and start the Docker container using Docker Compose:

    ```sh
    docker-compose up --build -d
    ```

3. Open your browser and navigate to `http://localhost:8080` to see the running application.

### Development

If you want to develop or modify the application locally:

1. Install dependencies:

    ```sh
    npm install
    ```

2. Start the development server:

    ```sh
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:5173` to see the running application.


### Code Formatting

To format your code using Prettier, you can use the following commands:

- **Format code:**

    ```sh
    npm run format
    ```

- **Check code formatting:**

    ```sh
    npm run format-check
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Bitcoin BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt) for the official recovery seed word list.
