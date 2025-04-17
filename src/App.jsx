
import React, { useState } from 'react';
import InventoryForm from './components/InventoryForm';
import { loadInventory } from './utils/storage';

function App() {
  const [inventory, setInventory] = useState(loadInventory());
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleAdd = () => {
    setEditItem(null);
    setShowForm(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Inventário de Equipamentos</h1>
      <button
        onClick={handleAdd}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Adicionar Equipamento
      </button>

      {showForm && (
        <InventoryForm
          onClose={() => setShowForm(false)}
          editItem={editItem}
          inventory={inventory}
          setInventory={setInventory}
        />
      )}

      <ul className="mt-6 space-y-2">
        {inventory.map((item) => (
          <li key={item.id} className="p-4 border rounded shadow">
            <div className="flex justify-between">
              <div>
                <strong>{item.type}</strong> - {item.model}
                <br />
                Série: {item.serialNumber}
              </div>
              <button
                className="text-blue-500 underline"
                onClick={() => {
                  setEditItem(item);
                  setShowForm(true);
                }}
              >
                Editar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
