<?php

namespace App\Manager;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;




class ImagesManager{

    public const DEFAULT_IMAGE = 'images/default.webp';

    final public static function uploadImage(string $name, int $width, int $height, string $path, string $file){
        $manager = new ImageManager(new Driver());

        $image_file_name = $name .'.webp';
        $image = $manager->read($file);
        $image = $image->resize($width, $height);
        $image->save(public_path($path) . $image_file_name , 50, 'webp');

        return $image_file_name;
    }

    /**
     * @param string $path
     * @param string|null $img
     * @return void
     */

    final public static function deleteImage(string $path, string $img):void
    {
        $path = public_path($path).$img;
        if($img !== '' && file_exists($path)){
            unlink($path);
        }
    }

    /**
     * @param string $path
     * @param string $image
     * @return string
     */
    final public static function prepareImageUrl(string $path, string|null $image):string
    {
        $url = url($path.$image);
        if(empty($image)){
            $url = url(self::DEFAULT_IMAGE);
        }
        return $url;
    }

        /**
     * @param string $file
     * @param string $name
     * @param string|null $existing_photo
     * @param  int $width
     * @param int $height
     * @param string $path
     * @param string $path_thumb
     * @param int $width_thumb
     * @param int $height_thumb
     * @return string
     */
    public static function processImageUpload(
        string $file,
        string $name,
        string $path,
        int $width,
        int $height,
        string $path_thumb = null,
        int $width_thumb = 0,
        int $height_thumb = 0,
        string|null $existing_photo = null
        ):string
    {
         if(!empty($existing_photo)){
            self::deleteImage($path, $existing_photo);
            if(!empty($path_thumb)){
                self::deleteImage($path_thumb, $existing_photo);
            }
        }
        $photo_name = self::uploadImage($name, $width, $height, $path, $file);
        if(!empty($path_thumb)){
            self::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
        }
        return $photo_name;
    }
}
