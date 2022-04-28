import React, { useRef } from 'react';
import { Image } from 'lucide-react';
import { isNull, merge } from 'lodash';
import { layout, size, effect, text } from '@acm-homepage/theme-shortcut';

import Input from './Input';

import styles from './styles/ImageInput.module.scss';

type SetDataURL = (DataURL: string) => void;

const toDataURL = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });

const onFileChange =
  (setDataURL: SetDataURL) =>
  async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (isNull(files)) return;
    try {
      setDataURL(await toDataURL(files[0]));
    } catch (e) {
      console.error('Cannot turn file to base 64 data url');
    }
  };

const Infomation = (props: {
  fileInputRef: React.RefObject<HTMLInputElement>;
}) => {
  const { fileInputRef } = props;

  if (
    isNull(fileInputRef.current) ||
    isNull(fileInputRef.current.files) ||
    fileInputRef.current.files.length == 0
  ) {
    return (
      <div className={styles.imageInput}>
        Please upload images...
      </div>
    );
  } else {
    return (
      <div className={styles.imageInput}>
        {fileInputRef.current.files[0].name}
      </div>
    );
  }
};

const ImageInput = (props: { setDataURL: SetDataURL }) => {
  const { setDataURL } = props;
  const fileInput = useRef<HTMLInputElement>(null);

  return (
    <Input.container>
      <Image className={styles.image} />
      <Infomation fileInputRef={fileInput} />
      <input
        ref={fileInput}
        tabIndex={-1}
        type="file"
        sx={merge(
          layout({ pos: 'absolute', z: -1, overflow: 'hidden' }),
          size({ w: 1, h: 1 }),
          effect({ opacity: 0 }),
        )}
        onChange={onFileChange(setDataURL)}
      />
    </Input.container>
  );
};

export default ImageInput;
