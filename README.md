# IntelijAIProxy

## Instructions

1. First, copy `env_example` as `.env`.
2. Insert the API key you generated in LiteLLM into the `API_KEY` in the `.env` file.
3. Start the service using Docker Compose.
    - Manually start Docker Compose via CMD with the following command:
      ```
      docker-compose up
      ```
4. After starting the service, go to IntelliJ IDEA, navigate to `AI Assistant -> Models`, and configure the provider as follows:
    - Provider: `openAi`
    - API Location: `http://localhost:3001`
5. Test the connection to ensure everything is working correctly.

after that the models from your provider shold be in the dropdown in the chat  inside intelij

