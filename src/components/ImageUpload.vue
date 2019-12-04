<!-- eslint-disable max-len -->
<template>
  <div class="image-upload" :class="{ 'generating' : generate }">
    <h1>3D Image Generator</h1>
    <section class="form-wrapper">
      <!--<figure class="preview-image-wrapper" :class="{ 'loaded' : previewImage }">
      </figure>-->

      <label for="inputImage" tabindex="0">
        <img v-if="previewImage" :src="previewImage" class="preview-image" />
        <svg class="upload-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 70.7 83.5" style="enable-background:new 0 0 70.7 83.5;" xml:space="preserve">
          <path id="arrow" d="M35.4,70.5c1.7,0,3-1.3,3-3V24.7l17.9,16.8c1.2,1.1,3.1,1,4.2-0.2c1.1-1.2,1-3-0.1-4.2l-23-21.6l-0.1-0.1
            c-0.2-0.1-0.3-0.3-0.5-0.4l0,0c-0.5-0.2-1-0.3-1.4-0.3l0,0c-0.5,0-0.9,0.1-1.4,0.3l0,0c-0.2,0.1-0.4,0.2-0.5,0.4l-0.1,0.1l-23,21.6
            c-1.2,1.1-1.3,3-0.2,4.2s3,1.3,4.2,0.2c0,0,0.1,0,0.1-0.1l17.9-16.7v42.8C32.4,69.2,33.7,70.5,35.4,70.5z"/>
          <path d="M67.1,76.7H3.6c-1.7,0-3,1.3-3,3s1.3,3,3,3h63.5c1.7,0,3-1.3,3-3S68.8,76.7,67.1,76.7z"/>
        </svg>

        <span>Choose Image</span>
        <input type="file" accept='image/*' id="inputImage" @change="uploadImage($event)">
      </label>

      <button v-if="generate" class="btn-primary" @click="submit">Generate</button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ImageUpload',
  data: () => ({
    file: Object,
    previewImage: null,
    previewImageBlobURL: null,
    generate: false,
  }),
  methods: {
    uploadImage(event) {
      this.file = null;
      this.previewImage = null;
      this.previewImageBlobURL = null;
      this.generate = false;

      const input = event.currentTarget;
      const file = input.files[0];
      this.file = file;

      if (input.files && this.file) {
        if (this.file.type.slice(0, 5) === 'image') {
          const reader = new FileReader();
          reader.readAsDataURL(this.file);
          reader.onload = (e) => {
            this.previewImage = e.target.result;
            this.previewImageBlobURL = URL.createObjectURL(this.file);
            this.generate = true;
          };
        } else {
          console.error('wrong file type');
        }
      } else {
        console.error('files empty!');
      }
    },
    submit() {
      this.$emit('imageChange', this.previewImage);
    },
  },
};
</script>

<style scoped lang="scss">
h1{
  color: white;
  font-weight: 800;
  font-size:2rem;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

figure{
  margin:0;
}

.btn-primary{
  -webkit-appearance: none;
  background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
  border: none;
  color: white;
  display: block;
  font-size: 1.2rem;
  font-family: inherit;
  font-weight: 800;
  padding: 15px 30px;
  margin-top: 20px;
  width: 100%;
  cursor: pointer;
  transform: translateY(0px);
  transition: all .3s ease;
  position: relative;

  &::after{
    content: '';
    display: block;
    position: absolute;
    top:0;
    left:0;
    height:100%;
    width:100%;
    background: #000;
    opacity: 0;
    transition: all .3s ease;
    z-index: -1;
  }

  &:hover, &:focus{
    transform: translateY(-3px) scale3d(1,1,1);
    outline: none;

    &::after{
    opacity: 0.25;
    }
  }

  &:active{
    transform: translateY(-3px) scale3d(.98,.98,1);
  }
}

.image-upload{
  height: 100vh;
  width: 100%;
  color:white;
  background: #efefef;
  background: #161719;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .form-wrapper{
    // border: 1px solid white;
    background: white;
    background: #2c2c2c;
    background: #333333;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  }
}

input{
  &[type="file"] {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    overflow: hidden;
    padding: 0;
    position: absolute !important;
    white-space: nowrap;
    width: 1px;
  }
}

label{
  border: 2px dashed white;
  padding: 35px;
  width:100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  overflow: hidden;
  transition: all .5s ease;
  height: 200px;
  position: relative;

  span{
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    z-index: 1;
    color: white;
  }

  .preview-image{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    opacity: .3;
  }

  .upload-icon{
    display: block;
    width: 30px;
    margin-bottom: 20px;
    opacity: 0.75;
    margin-top: 5px;
    transition: all .5s ease;

    path{
      fill: white;
      transition: all .5s ease;
    }
  }

  &:hover, &:focus{
    .upload-icon{
      opacity: 1;

      #arrow{
        transform: translateY(-10px);
      }
    }
  }
}
</style>
