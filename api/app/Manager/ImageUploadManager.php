<?php

namespace App\Manager;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;
use Illuminate\Support\Facades\Log;

class ImageUploadManager{
    final public static function uploadImage(string $name, int $width, int $height, string $path, string $file){
        $manager = new ImageManager(new Driver());

        $image_file_name = $name .'.webp';
        Log::debug($file);
        $image = $manager->read($file);
        $image = $image->resize($width, $height);
        $image->save(public_path($path) . $image_file_name , 50, 'webp');

        return $image_file_name;
    }

    /**
     * @param $path
     * @param $img
     * @return void
     */

    final public static function deleteImage($path, $img):void
    {
        $path = public_path($path).$img;
        if($img !== '' && file_exists($path)){
            unlink($path);
        }
    }
}
