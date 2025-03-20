FROM gcr.io/distroless/python3-debian12:nonroot AS runner

WORKDIR /magazine

COPY ./ /magazine

RUN apt-get update && apt-get install -y poppler-utils python3-distutils

RUN pip install --no-cache-dir --upgrade -r /magazine/requirements.txt 
