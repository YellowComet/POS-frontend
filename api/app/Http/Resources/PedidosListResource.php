<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed $id
 * @property mixed $comprador
 * @property mixed $total
 * @property mixed $subTotal
 * @property mixed $formaPago
 * @property mixed $descuento
 * @property mixed $nproductos
 * @property mixed $created_at
 * @property mixed $updated_at
 * @property mixed $totalproductos
 * @property mixed $productos
 * @property mixed $transaction_id
 */
class PedidosListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=> $this->id,
            'comprador'=> $this->comprador,
            'total'=> $this->total,
            'subTotal'=> $this->subTotal,
            'formaPago'=> $this->formaPago,
            'descuento'=> $this->descuento,
            'nproductos'=> $this->nproductos,
            'transaction_id'=> $this->transaction_id,
            'totalproductos' => $this->totalproductos,
            'productos' => unserialize($this->productos),
            'created_at'=> $this->created_at->toDayDateTimeString(),
            'updated_at'=> $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not updated yet',
        ];
    }
}
