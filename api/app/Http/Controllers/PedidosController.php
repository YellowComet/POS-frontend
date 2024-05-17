<?php

namespace App\Http\Controllers;

use App\Http\Resources\PedidosListResource;
use App\Models\Pedidos;
use App\Http\Requests\StorePedidosRequest;
use App\Http\Requests\UpdatePedidosRequest;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PedidosController extends Controller
{
    /**
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    final public function index(Request $request):AnonymousResourceCollection
    {
        $pedidos = (new Pedidos())->getAllPedidos($request->all());
        return PedidosListResource::collection($pedidos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePedidosRequest $request)
    {
        $maxId = Pedidos::max('transaction_id');

        if ($maxId !== null) {
            $maxId = $maxId + 1;
        } else {
            $maxId = 1;
        }
        $trans_id = 1;
        $pedido = $request->except('productos');
        $pedido['productos'] = serialize($request->input('productos'));
        $pedido['transaction_id'] = $maxId;
        $pedido = Pedidos::create($pedido);
        return response()->json(['msg'=>'Pedido Created Successfully','cls'=>'success', 'transaction_id'=> $maxId]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pedidos $pedidos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pedidos $pedidos)
    {
        //
    }

    /**
     * @param UpdatePedidosRequest $request
     * @param Pedidos $category
     * @return JsonResponse
     */
    final public function update(UpdatePedidosRequest $request, Pedidos $pedido):JsonResponse
    {
        $pedido_data = $request->except('productos');
        $pedido_data['productos'] = serialize($request->input('productos'));
        $pedido->update($pedido_data);
        return response()->json(['msg'=>'Pedido Update Successfully','cls'=>'success']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pedidos $pedidos)
    {
        //
    }


    /**
     * @param int $id
     * @return AnonymousResourceCollection
     */
    final public function get_pedido(int $id):AnonymousResourceCollection
    {
        $pedido = (new Pedidos())->getPedidoById($id);
        return PedidosListResource::collection($pedido);
        // return response()->json($pedido);
    }
}
