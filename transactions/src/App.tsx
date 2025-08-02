import React from "react";
import { Extrato } from "./components/Extrato";


function AppTransaction() {
  return (
    <div className="bg-gray-50">


      {/* Content */}
      <main className="p-4 md:p-6">
        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>Todos os períodos</option>
                <option>Últimos 30 dias</option>
                <option>Últimos 90 dias</option>
                <option>Este ano</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>Todas as categorias</option>
                <option>Receitas</option>
                <option>Despesas</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
              <input 
                type="text" 
                placeholder="Buscar transação..."
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Extrato Completo */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Todas as Transações</h2>
          </div>
          <Extrato />
        </div>
      </main>
    </div>
  );
}

export default AppTransaction;
