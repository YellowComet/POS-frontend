<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class Pedidos extends Model
{
    use HasFactory;

    protected $fillable = ['comprador', 'total', 'subTotal', 'formaPago', 'descuento', 'nproductos', 'totalproductos', 'productos', 'transaction_id'];

    /**
     * @param array $input
     * @return LengthAwarePaginator
     */
    final public function getAllPedidos(array $input):LengthAwarePaginator
    {
        $per_page = $input['per_page'] ?? 5;
        $direction = $input['direction'] ?? 'asc';
        $query = self::query();

        if(!empty($input['search'])){
            $query->where('transaction_id','like','%'. $input['search'] .'%');
        }
        if(!empty($input['order_by'])){
            $query->orderBy($input['order_by'], $direction);
        }
        return $query->paginate($per_page);

        // $pedidos = self::query()->get();
        // foreach ($pedidos as $productos)
        // {
        //     $productos['productos'] = unserialize($productos['productos']);
        // }
        // return $pedidos;
    }


    final public function getPedidoById(int $input)
    {
        $pedido = self::query()->where('transaction_id', $input)->get();
        // foreach ($pedido as $productos)
        // {
        //     $productos['productos'] = unserialize($productos['productos']);
        // }
        return $pedido;
    }
}
