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

    // Enviar para o webhook
    const response = await fetch('https://webhook.site/de3b214d-cfae-4d25-9b30-d648d182d509', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend)
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar dados');
    }

    // Simular processamento adicional
    await new Promise(resolve => setTimeout(resolve, 2000));
    setResultUrl('https://example.com/your-card');
    
    // Limpar dados do localStorage
    localStorage.removeItem('kabbalisticFormData');
    localStorage.removeItem('kabbalisticFormStep');

  } catch (error) {
    console.error('Erro:', error);
    alert('Houve um erro ao enviar os dados. Por favor, tente novamente.');
  } finally {
    setIsSubmitting(false);
  }
};

export default App;
