# Use official Python image
FROM python:3.12-slim

# Set environment variables
ENV POETRY_VERSION=1.8.2 \
    POETRY_VIRTUALENVS_CREATE=false \
    PYTHONUNBUFFERED=1

# Install Poetry
RUN pip install "poetry==$POETRY_VERSION"

# Set workdir
WORKDIR /app

# Copy only dependency files first for caching
COPY pyproject.toml poetry.lock* main.py ./

# Install dependencies
RUN poetry install --no-interaction --no-ansi --only main

# Copy the rest of the code
# COPY . .

# Expose port
EXPOSE 8000

# Run the app
CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] 