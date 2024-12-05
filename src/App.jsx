import React, { useState } from 'react';

function App() {
    const [program, setProgram] = useState('');
    const [testModule, setTestModule] = useState('');
    const [result, setResult] = useState('');
    const [flowgraph, setFlowgraph] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/execute/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ program, test_module: testModule }),
            });

            const data = await response.json();
            if (response.ok) {
                setResult(data.report);
                setFlowgraph(data.flowgraph); // Set flowgraph image path
            } else {
                setResult('Error: ' + data.error);
            }
        } catch (error) {
            setResult('Error: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Uji Kode Program</h1>
            <textarea
                placeholder="Masukkan kode program di sini..."
                rows="10"
                cols="50"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
            />
            <textarea
                placeholder="Masukkan modul uji di sini..."
                rows="10"
                cols="50"
                value={testModule}
                onChange={(e) => setTestModule(e.target.value)}
            />
            <button onClick={handleSubmit}>Kirim</button>
            <h2>Hasil Uji:</h2>
            <pre>{result}</pre>
            {flowgraph && <img src={flowgraph} alt="Flowgraph" />} {/* Menampilkan flowgraph */}
        </div>
    );
}

export default App;