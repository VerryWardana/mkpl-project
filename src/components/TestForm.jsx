// src/components/TestForm.js
import React, { useState } from 'react';

const TestForm = () => {
    const [program, setProgram] = useState('');
    const [testModule, setTestModule] = useState('');
    const [testResults, setTestResults] = useState([]);
    const [flowchart, setFlowchart] = useState('');
    const [report, setReport] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Kirim data ke backend untuk diproses
        fetch('http://127.0.0.1:8000/api/test/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ program, testModule }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Terjadi kesalahan saat memproses permintaan.');
            }
            return response.json();
        })
        .then(data => {
            setTestResults(data.test_results);
            setFlowchart(data.flowchart);
            setReport(data.report);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div>
            <h2>Uji Program</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Program yang akan diuji:</label>
                    <textarea
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Modul Testing:</label>
                    <textarea
                        value={testModule}
                        onChange={(e) => setTestModule(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Memproses...' : 'Uji Program'}
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {testResults.length > 0 && (
                <div>
                    <h3>Hasil Test</h3>
                    <ul>
                        {testResults.map((result, index) => (
                            <li key={index}>{result}</li>
                        ))}
                    </ul>
                </div>
            )}

            {flowchart && (
                <div>
                    <h3>Flowchart</h3>
                    <p>{flowchart}</p>
                </div>
            )}

            {report && (
                <div>
                    <h3>Laporan Hasil Testing</h3>
                    <p>{report}</p>
                </div>
            )}
        </div>
    );
};

export default TestForm;