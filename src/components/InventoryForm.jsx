
import React, { useState, useEffect } from 'react';
import { saveInventory } from '../utils/storage';

function InventoryForm({ onClose, editItem, inventory, setInventory }) {
  const [formData, setFormData] = useState({
    type: '',
    model: '',
    serialNumber: '',
    acquisitionDate: '',
    status: 'disponivel',
    notes: ''
  });

  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
    }
  }, [editItem]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      ...formData,
      id: editItem ? editItem.id : Date.now().toString()
    };

    let updatedInventory;
    if (editItem) {
      updatedInventory = inventory.map(item =>
        item.id === editItem.id ? newItem : item
      );
    } else {
      updatedInventory = [...inventory, newItem];
    }

    setInventory(updatedInventory);
    saveInventory(updatedInventory);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">
        {editItem ? 'Editar Equipamento' : 'Adicionar Equipamento'}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de Equipamento
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        >
          <option value="">Selecione o tipo</option>
          <option value="computador">Computador</option>
          <option value="monitor">Monitor</option>
          <option value="teclado">Teclado</option>
          <option value="mouse"><span translate="no">Mouse</span></option>

          <option value="tablet" translate="no">Tablet</option>

          <option value="impressora">Impressora</option>
          <option value="outro">Outros periféricos</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Marca/Modelo
        </label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Número de Série
        </label>
        <input
          type="text"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Data de Aquisição
        </label>
        <input
          type="date"
          name="acquisitionDate"
          value={formData.acquisitionDate}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        >
          <option value="disponivel">Disponível</option>
          <option value="em_uso">Em Uso</option>
          <option value="manutencao">Em Manutenção</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Observações
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          rows="3"
        />
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {editItem ? 'Salvar Alterações' : 'Adicionar'}
        </button>
      </div>
    </form>
  );
}

export default InventoryForm;
