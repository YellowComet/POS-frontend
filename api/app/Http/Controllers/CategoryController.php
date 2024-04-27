<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryListResource;
use App\Manager\ImagesManager;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;


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
            $file = $request->input('photo');
            $width = 800;
            $height = 800;
            $width_thumb = 150;
            $height_thumb = 150;
            $name = Str::slug($request->input('slug'));
            $path = Category::IMAGE_UPLOAD_PATH;
            $path_thumb = Category::THUMB_IMAGE_UPLOAD_PATH;
            $category['photo'] = ImagesManager::uploadImage($name, $width, $height, $path, $file);
            ImagesManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
        }
        (new Category)->storeCategory($category);
        return response()->json(['msg'=>'Category Created Successfully','cls'=>'success']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
