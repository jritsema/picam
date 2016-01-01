# copy in node app and expose server port
FROM hypriot/rpi-node:4.1.2-onbuild
EXPOSE 9000

# build raspberry pi userland tools (which includes raspistill) from source, since they don't appear to be included in the base image
RUN apt-get update && apt-get install -y \
      build-essential \
      cmake \
      curl \
      git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN cd \
      && git clone --depth 1 https://github.com/raspberrypi/userland.git \
      && cd userland \
      && ./buildme

# add raspistill to path
ENV PATH /opt/vc/bin:/opt/vc/lib:$PATH

# update library path (to get past: raspistill: error while loading shared libraries: libmmal_core.so: cannot open shared object file: No such file or directory)
ADD 00-vmcs.conf /etc/ld.so.conf.d/
RUN ldconfig

