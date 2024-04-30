<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryEditResource;
use App\Http\Resources\CategoryListResource;
use App\Manager\ImagesManager;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    /**
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    final public function index(Request $request):AnonymousResourceCollection
    {
        $categories = (new Category())->getAllCategories($request->all());
        return CategoryListResource::collection($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $category = $request->except('photo');
        $category['slug'] = Str::slug($request->input('slug'));
        $category['user_id'] = auth()->id();
        if($request->has('photo')){
            $category['photo'] = $this->processImageUpload($request->input('photo'), $category['slug']);
        }
        (new Category)->storeCategory($category);
        return response()->json(['msg'=>'Category Created Successfully','cls'=>'success']);
    }

    /**
     * @param Category $category
     * @return CategoryEditResource
     */
    final public function show(Category $category):CategoryEditResource
    {
        return new CategoryEditResource($category);
    }

    /**
     * @param UpdateCategoryRequest $request
     * @param Category $category
     * @return JsonResponse
     */
    final public function update(UpdateCategoryRequest $request, Category $category):JsonResponse
    {
        $category_data = $request->except('photo');
        $category_data['slug'] = Str::slug($request->input('slug'));
        if($request->has('photo')){
            $category_data['photo'] = $this->processImageUpload($request->input('photo'), $category_data['slug'], $category->photo);
        }
        $category->update($category_data);
        return response()->json(['msg'=>'Category Update Successfully','cls'=>'success']);
    }

    /**
     * @param Category $category
     * @return JsonResponse
     */
    final public function destroy(Category $category):JsonResponse
    {
        if(!empty($category->photo)){
            ImagesManager::deleteImage(Category::IMAGE_UPLOAD_PATH, $category->photo);
            ImagesManager::deleteImage(Category::THUMB_IMAGE_UPLOAD_PATH, $category->photo);
        }
        $category->delete();
        return response()->json(['msg'=>'Category Deleted Successfully','cls'=>'warning']);
    }

    /**
     * @return JsonResponse
     */
    final public function get_category_list():JsonResponse
    {
        $categories = (new Category())->getCategoryIdAndName();
        return response()->json($categories);
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
        $path = Category::IMAGE_UPLOAD_PATH;
        $path_thumb = Category::THUMB_IMAGE_UPLOAD_PATH;

         if(!empty($existing_photo)){
            ImagesManager::deleteImage(Category::IMAGE_UPLOAD_PATH, $existing_photo);
            ImagesManager::deleteImage(Category::THUMB_IMAGE_UPLOAD_PATH, $existing_photo);
        }

        $photo_name = ImagesManager::uploadImage($name, $width, $height, $path, $file);
        ImagesManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
        return $photo_name;
    }
}
