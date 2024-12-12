import React from 'react';

function App() {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    name: '',
    birthDate: '',
    gender: '',
    country: '',
    phone: '',
    email: '',
    password: '',
    selectedCard: '',
    level: 'basic'
  });
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [resultUrl, setResultUrl] = React.useState('');

  // Carregar dados salvos
  React.useEffect(() => {
    const savedData = localStorage.getItem('kabbalisticFormData');
    const savedStep = localStorage.getItem('kabbalisticFormStep');
    
    if (savedData) setFormData(JSON.parse(savedData));
    if (savedStep) setStep(parseInt(savedStep));
  }, []);

  // Salvar dados
  React.useEffect(() => {
    localStorage.setItem('kabbalisticFormData', JSON.stringify(formData));
    localStorage.setItem('kabbalisticFormStep', step.toString());
  }, [formData, step]);

  const validateStep = () => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.name) newErrors.name = 'Nome é obrigatório';
        if (!formData.birthDate) newErrors.birthDate = 'Data é obrigatória';
        if (!formData.gender) newErrors.gender = 'Gênero é obrigatório';
        break;
      case 2:
        if (!formData.selectedCard) newErrors.selectedCard = 'Selecione uma carta';
        break;
      case 4:
        if (!formData.country) newErrors.country = 'País é obrigatório';
        if (!formData.phone) newErrors.phone = 'Telefone é obrigatório';
        if (!formData.email || !formData.email.includes('@')) newErrors.email = 'Email inválido';
        if (!formData.password || formData.password.length < 6) newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(s => s + 1);
    }
  };

  const handleBack = () => {
    setStep(s => s - 1);
  };

 const handleSubmit = async () => {
  setIsSubmitting(true);
  try {
    // Preparar os dados para envio
    const dataToSend = {
      dadosPessoais: {
        nome: formData.name,
        dataNascimento: formData.birthDate,
        genero: formData.gender === 'male' ? 'Homem' : 
                formData.gender === 'female' ? 'Mulher' : 'Outro'
      },
      cartaEscolhida: formData.selectedCard,
      nivelRelatorio: formData.level === 'basic' ? 'Básico - Gratuito' :
                      formData.level === 'intermediate' ? 'Intermediário - 4 dólares' :
                      'Avançado - 12 dólares',
      contato: {
        pais: formData.country === 'BR' ? 'Brasil' :
              formData.country === 'PT' ? 'Portugal' :
              formData.country === 'AR' ? 'Argentina' : '',
        telefone: formData.phone,
        email: formData.email
      },
      dataEnvio: new Date().toISOString(),
    };

    console.log('Tentando enviar dados:', dataToSend); // Debug

    // Enviar para o webhook
    const response = await fetch('https://webhook.site/de3b214d-cfae-4d25-9b30-d648d182d509', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors',
      body: JSON.stringify(dataToSend)
    });

    console.log('Resposta recebida:', response); // Debug

    if (!response.ok) {
      throw new Error(`Erro ao enviar dados: ${response.status} - ${response.statusText}`);
    }

    const responseData = await response.text();
    console.log('Dados da resposta:', responseData); // Debug

    // Simular processamento adicional
    await new Promise(resolve => setTimeout(resolve, 2000));
    setResultUrl('https://example.com/your-card');
    
    // Limpar dados do localStorage
    localStorage.removeItem('kabbalisticFormData');
    localStorage.removeItem('kabbalisticFormStep');

  } catch (error) {
    console.error('Erro detalhado:', error); // Debug
    alert(`Houve um erro ao enviar os dados: ${error.message}`);
  } finally {
    setIsSubmitting(false);
  }
};
    setIsSubmitting(true);
    try {
      // Preparar os dados para envio
      const dataToSend = {
        dadosPessoais: {
          nome: formData.name,
          dataNascimento: formData.birthDate,
          genero: formData.gender === 'male' ? 'Homem' : 
                  formData.gender === 'female' ? 'Mulher' : 'Outro'
        },
        cartaEscolhida: formData.selectedCard,
        nivelRelatorio: formData.level === 'basic' ? 'Básico - Gratuito' :
                        formData.level === 'intermediate' ? 'Intermediário - 4 dólares' :
                        'Avançado - 12 dólares',
        contato: {
          pais: formData.country === 'BR' ? 'Brasil' :
                formData.country === 'PT' ? 'Portugal' :
                formData.country === 'AR' ? 'Argentina' : '',
          telefone: formData.phone,
          email: formData.email
        },
        dataEnvio: new Date().toISOString(),
      };

      // Enviar para o webhook
      const handleSubmit = async () => {
  setIsSubmitting(true);
  try {
    // Preparar os dados para envio
    const dataToSend = {
      dadosPessoais: {
        nome: formData.name,
        dataNascimento: formData.birthDate,
        genero: formData.gender === 'male' ? 'Homem' : 
                formData.gender === 'female' ? 'Mulher' : 'Outro'
      },
      cartaEscolhida: formData.selectedCard,
      nivelRelatorio: formData.level === 'basic' ? 'Básico - Gratuito' :
                      formData.level === 'intermediate' ? 'Intermediário - 4 dólares' :
                      'Avançado - 12 dólares',
      contato: {
        pais: formData.country === 'BR' ? 'Brasil' :
              formData.country === 'PT' ? 'Portugal' :
              formData.country === 'AR' ? 'Argentina' : '',
        telefone: formData.phone,
        email: formData.email
      },
      dataEnvio: new Date().toISOString(),
    };

    // Enviar para o webhook
    const response = await fetch('https://shipfast-n8n.fggnne.easypanel.host/webhook-test/b68acee2-7b60-49ed-93f7-484e30bc0f75', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors',
      body: JSON.stringify(dataToSend)
    });

    console.log('Resposta recebida:', response); // Debug

    if (!response.ok) {
      throw new Error(`Erro ao enviar dados: ${response.status} - ${response.statusText}`);
    }

    const responseData = await response.text();
    console.log('Dados da resposta:', responseData); // Debug

    // Simular processamento adicional
    await new Promise(resolve => setTimeout(resolve, 2000));
    setResultUrl('https://example.com/your-card');
    
    // Limpar dados do localStorage
    localStorage.removeItem('kabbalisticFormData');
    localStorage.removeItem('kabbalisticFormStep');

  } catch (error) {
    console.error('Erro detalhado:', error); // Debug
    alert(`Houve um erro ao enviar os dados: ${error.message}`);
  } finally {
    setIsSubmitting(false);
  }
};

  function renderStep() {
    switch (step) {
      case 1:
        return (
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Dados Pessoais</h2>
            <div>
              <input
                type="text"
                placeholder="Nome completo"
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                className={`w-full p-3 border rounded-lg ${errors.name ? 'border-red-500 bg-red-50' : ''}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={e => handleChange('birthDate', e.target.value)}
                  className={`w-full p-3 border rounded-lg ${errors.birthDate ? 'border-red-500 bg-red-50' : ''}`}
                />
                {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
              </div>
              <div className="w-1/2">
                <select
                  value={formData.gender}
                  onChange={e => handleChange('gender', e.target.value)}
                  className={`w-full p-3 border rounded-lg ${errors.gender ? 'border-red-500 bg-red-50' : ''}`}
                >
                  <option value="">Selecione o gênero</option>
                  <option value="male">Homem</option>
                  <option value="female">Mulher</option>
                  <option value="other">Outro</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Escolha sua carta</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Carta do Destino', desc: 'Desvende seu caminho único' },
                { title: 'Carta da Alma', desc: 'Revele seus segredos internos' },
                { title: 'Carta do Propósito', desc: 'Encontre sua missão' },
                { title: 'Carta de Transformação', desc: 'Desperte seu potencial' }
              ].map(card => (
                <div
                  key={card.title}
                  onClick={() => handleChange('selectedCard', card.title)}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    formData.selectedCard === card.title ? 'bg-purple-100 border-purple-500' : ''
                  }`}
                >
                  <h3 className="font-bold">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.desc}</p>
                </div>
              ))}
            </div>
            {errors.selectedCard && <p className="text-red-500 text-sm mt-1">{errors.selectedCard}</p>}
          </div>
        );

      case 3:
        return (
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Profundidade do Relatório</h2>
            <select 
              value={formData.level}
              onChange={e => handleChange('level', e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="basic">📖 Básico - Gratuito</option>
              <option value="intermediate">🔍 Intermediário - 4 dólares</option>
              <option value="advanced">💎 Avançado - 12 dólares</option>
            </select>
          </div>
        );

      case 4:
        return (
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Contato</h2>
            <div className="flex gap-4">
              <select
                value={formData.country}
                onChange={e => {
                  handleChange('country', e.target.value);
                  handleChange('phone', '');
                }}
                className={`w-1/3 p-3 border rounded-lg ${errors.country ? 'border-red-500 bg-red-50' : ''}`}
              >
                <option value="">País</option>
                <option value="BR">🇧🇷 Brasil</option>
                <option value="PT">🇵🇹 Portugal</option>
                <option value="AR">🇦🇷 Argentina</option>
              </select>
              <input
                type="tel"
                placeholder="Telefone"
                value={formData.phone}
                onChange={e => handleChange('phone', e.target.value)}
                className={`w-2/3 p-3 border rounded-lg ${errors.phone ? 'border-red-500 bg-red-50' : ''}`}
                disabled={!formData.country}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={e => handleChange('email', e.target.value)}
              className={`w-full p-3 border rounded-lg ${errors.email ? 'border-red-500 bg-red-50' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            <input
              type="password"
              placeholder="Senha"
              value={formData.password}
              onChange={e => handleChange('password', e.target.value)}
              className={`w-full p-3 border rounded-lg ${errors.password ? 'border-red-500 bg-red-50' : ''}`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
        );

      case 5:
        if (isSubmitting) {
          return (
            <div className="p-6 text-center">
              <div className="py-12 space-y-4">
                <div className="text-6xl mb-4">🔮</div>
                <h2 className="text-2xl font-bold">Gerando sua carta...</h2>
                <p className="text-gray-600">Aguarde enquanto preparamos sua jornada</p>
              </div>
            </div>
          );
        }
        if (resultUrl) {
          return (
            <div className="p-6 text-center">
              <div className="py-12">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg inline-block">
                  <h3 className="font-bold text-green-800 text-xl mb-4">Sua carta está pronta!</h3>
                  <button
                    onClick={() => window.open(resultUrl, '_blank')}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
                  >
                    Baixar Carta
                  </button>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Confirme suas informações</h2>
            <div className="space-y-4 border rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold text-purple-800">Dados Pessoais</h3>
                  <p>Nome: {formData.name}</p>
                  <p>Data: {formData.birthDate}</p>
                  <p>Gênero: {
                    formData.gender === 'male' ? 'Homem' : 
                    formData.gender === 'female' ? 'Mulher' : 
                    'Outro'
                  }</p>
                </div>
                <div>
                  <h3 className="font-bold text-purple-800">Contato</h3>
                  <p>País: {
                    formData.country === 'BR' ? '🇧🇷 Brasil' :
                    formData.country === 'PT' ? '🇵🇹 Portugal' :
                    formData.country === 'AR' ? '🇦🇷 Argentina' : ''
                  }</p>
                  <p>Telefone: {formData.phone}</p>
                  <p>Email: {formData.email}</p>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-purple-800">Carta Escolhida</h3>
                <p>{formData.selectedCard}</p>
              </div>
              <div>
                <h3 className="font-bold text-purple-800">Profundidade do Relatório</h3>
                <p>{
                  formData.level === 'basic' ? '📖 Básico - Gratuito' :
                  formData.level === 'intermediate' ? '🔍 Intermediário - 4 dólares' :
                  '💎 Avançado - 12 dólares'
                }</p>
              </div>
            </div>
          </div>
        );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white rounded-t-xl">
          <h1 className="text-3xl font-bold">Carta Kabbalística</h1>
          <p>Sua jornada de autodescoberta começa aqui</p>
        </div>

        <div className="px-6 py-2 border-b">
          <div className="h-2 bg-gray-200 rounded overflow-hidden">
            <div 
              className="h-full bg-purple-600 transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {renderStep()}

        <div className="p-6 bg-gray-50 flex justify-between rounded-b-xl">
          {step > 1 && !isSubmitting && !resultUrl && (
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Voltar
            </button>
          )}
          
          {step < 5 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg ml-auto hover:bg-purple-700"
            >
              Próximo
            </button>
          ) : !isSubmitting && !resultUrl && (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-500 text-white rounded-lg ml-auto hover:bg-green-600"
            >
              Gerar Carta
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
