<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use App\Http\Requests\StoreQuoteRequest;
use App\Http\Requests\UpdateQuoteRequest;
use Exception;

class QuoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $quotes = Quote::all();
            return response()->json([
                'message' => 'List Quotes',
                'data' => $quotes
                ] ,200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuoteRequest $request)
    {
        try {
            $validatedData = $request->safe()->all();

            $quote = Quote::create($validatedData);

            return response()->json([
                'message' => 'Quote berhasil dibuat',
                'data' => $quote
                ] ,201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Quote $quote)
    {
        try {
            return response()->json([
                'message' => 'Detail Quote',
                'data' => $quote
            ] ,200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuoteRequest $request, Quote $quote)
    {
        try {
            $validated = $request->safe()->all();

            if($quote->update($validated)){
                return response()->json([
                    'message' => 'Quote Updated',
                    'data' => $quote
                ], 200);
            }

            return response()->json([
                'message' => 'Quote not updated',
               'data' => null
           ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quote $quote)
    {
         try {
            if($quote->delete()){
                return response()->json([
                    'message' => 'Quote Deleted',
                    'data' => null
                ], 200);
            }

            return response()->json([
                'message' => 'Quote not deleted',
               'data' => null
              ], 500);

        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'data' => null
            ], 500);

        }
    }
}
