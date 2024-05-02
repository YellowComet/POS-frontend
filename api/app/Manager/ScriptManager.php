<?php

namespace App\Manager;
use App\Models\Ciudad;
use App\Models\Provincia;
use Illuminate\Support\Facades\Http;
use App\Models\CA;

class ScriptManager{

    public function getLocationData()
    {
        $urlCAs = 'https://apiv1.geoapi.es/comunidades?type=JSON&key=&sandbox=1';

        $response = Http::get($urlCAs);
        $CAs = (json_decode($response->body(), true));
        foreach ($CAs['data'] as $key => $CA)
        {
            $CA_data['original_id'] = $CA['CCOM'];
            $CA_data['name'] = $CA['COM'];
            $created_ca = CA::create($CA_data);
            $urlP = 'https://apiv1.geoapi.es/provincias?CCOM='.$CA_data['original_id'].'&type=JSON&key=&sandbox=1';
            echo $urlP;
            $responseP = Http::get($urlP);
            $provincias = (json_decode($responseP->body(), true));
            foreach ($provincias['data'] as $provincia)
            {
                $provincia_data['original_id'] = $provincia['CPRO'];
                $provincia_data['c_a_s_id'] = $created_ca->id;
                $provincia_data['name'] = $provincia['PRO'];
                $created_pro = Provincia::create($provincia_data);
                $urlC = 'https://apiv1.geoapi.es/municipios?CPRO='.$provincia_data['original_id'].'&type=JSON&key=&sandbox=1';
                $responseC = Http::get($urlC);
                $ciudades = (json_decode($responseC->body(), true));
                foreach ($ciudades['data'] as $ciudad)
                {
                    $ciudad_data['original_id'] = $ciudad['CMUM'];
                    $ciudad_data['provincias_id'] = $created_pro->id;
                    $ciudad_data['name'] = $ciudad['DMUN50'];
                    Ciudad::create($ciudad_data);
                }
            }
        }
        echo 'success';
    }
}
