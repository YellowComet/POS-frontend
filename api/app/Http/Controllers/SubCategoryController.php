<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubCategoryEditResource;
use App\Http\Resources\SubCategoryListResource;
use App\Models\SubCategory;
use App\Http\Requests\StoreSubCategoryRequest;
use App\Http\Requests\UpdateSubCategoryRequest;
use App\Manager\ImagesManager;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\JsonResponse;

class SubCategoryController extends Controller
{
    /**
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function index(Request $request):AnonymousResourceCollection
    {
        $categories = (new SubCategory())->getAllSubCategories($request->all());
        return SubCategoryListResource::collection($categories);
    }

    /**
     * @param StoreSubCategoryRequest $request
     * @return JsonResponse
     */
    final public function store(StoreSubCategoryRequest $request):JsonResponse
    {
        $sub_category = $request->except('photo');
        $sub_category['slug'] = Str::slug($request->input('slug'));
        $sub_category['user_id'] = auth()->id();
        if($request->has('photo')){
            $sub_category['photo'] = $this->processImageUpload($request->input('photo'), $sub_category['slug']);
        }
        (new SubCategory)->storeSubCategory($sub_category);
        return response()->json(['msg'=>'SubCategory Created Successfully','cls'=>'success']);
    }

    /**
     * @param SubCategory $subCategory
     * @return SubCategoryEditResource
     */
    final public function show(SubCategory $subCategory):SubCategoryEditResource
    {
        return new SubCategoryEditResource($subCategory);
    }

    /**
     * @param UpdateSubCategoryRequest $request
     * @param SubCategory $category
     * @return JsonResponse
     */
    public function update(UpdateSubCategoryRequest $request, SubCategory $subCategory):JsonResponse
    {
        $subcategory_data = $request->except('photo');
        $subcategory_data['slug'] = Str::slug($request->input('slug'));
        if($request->has('photo')){
            $subcategory_data['photo'] = $this->processImageUpload($request->input('photo'), $subcategory_data['slug'], $subCategory->photo);
        }
        $subCategory->update($subcategory_data);
        return response()->json(['msg'=>'Sub-Category Update Successfully','cls'=>'success']);
    }

    /**
     * @param SubCategory $subCategory
     * @return JsonResponse
     */
    final public function destroy(SubCategory $subCategory):JsonResponse
    {
        if(!empty($subCategory->photo)){
            ImagesManager::deleteImage(SubCategory::IMAGE_UPLOAD_PATH, $subCategory->photo);
            ImagesManager::deleteImage(SubCategory::THUMB_IMAGE_UPLOAD_PATH, $subCategory->photo);
        }
        $subCategory->delete();
        return response()->json(['msg'=>'Sub-Category Deleted Successfully','cls'=>'warning']);
    }

    /**
     * @param string $file
     * @param string $name
     * @param string|null $existing_photo
     * @return string
     */
    private function processImageUpload(string $file, string $name, string|null $existing_photo = null):string
    {
        $width = 800;
        $height = 800;
        $width_thumb = 150;
        $height_thumb = 150;
        $path = SubCategory::IMAGE_UPLOAD_PATH;
        $path_thumb = SubCategory::THUMB_IMAGE_UPLOAD_PATH;

         if(!empty($existing_photo)){
            ImagesManager::deleteImage(SubCategory::IMAGE_UPLOAD_PATH, $existing_photo);
            ImagesManager::deleteImage(SubCategory::THUMB_IMAGE_UPLOAD_PATH, $existing_photo);
        }

        $photo_name = ImagesManager::uploadImage($name, $width, $height, $path, $file);
        ImagesManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
        return $photo_name;
    }

}
