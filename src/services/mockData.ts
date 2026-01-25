import type { Paroquia, Noticia, LiturgiaDiaria } from '@/types'

/**
 * Dados mockados de uma paróquia católica
 */
export const mockParoquia: Paroquia = {
  id: '1',
  nome: 'Paróquia Nossa Senhora de Guadalupe',
  padroeiro: 'Nossa Senhora de Guadalupe',
  diocese: 'Diocese de São Paulo',
  descricao: 'Uma comunidade de fé, esperança e amor, onde todos são bem-vindos para celebrar a presença de Cristo em nossas vidas. Há mais de 50 anos servindo a comunidade com dedicação e amor ao próximo.',
  localizacao: {
    endereco: 'Rua das Flores, 123 - Centro',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567',
    latitude: -23.550520,
    longitude: -46.633308
  },
  redesSociais: {
    facebook: 'https://facebook.com/paroquiansgpe',
    instagram: 'https://instagram.com/paroquiansgpe',
    youtube: 'https://youtube.com/@paroquiansgpe',
    email: 'contato@paroquiansgpe.org.br',
    telefone: '(11) 3456-7890',
    whatsapp: '(11) 98765-4321',
    horarioSecretaria: 'Segunda a Sexta: 9h às 12h e 14h às 18h | Sábado: 9h às 12h'
  },
  horariosMissa: [
    // Domingo
    {
      id: '1',
      diaSemana: 'Domingo',
      horario: '07:00',
      tipo: 'Normal',
      observacao: 'Missa com Coro Infantil'
    },
    {
      id: '2',
      diaSemana: 'Domingo',
      horario: '09:00',
      tipo: 'Normal',
      observacao: 'Missa com Coro Jovem'
    },
    {
      id: '3',
      diaSemana: 'Domingo',
      horario: '11:00',
      tipo: 'Solene',
      observacao: 'Missa Solene com todos os coros'
    },
    {
      id: '4',
      diaSemana: 'Domingo',
      horario: '19:00',
      tipo: 'Normal',
      observacao: 'Missa Vespertina'
    },
    // Segunda
    {
      id: '5',
      diaSemana: 'Segunda',
      horario: '07:00',
      tipo: 'Normal'
    },
    {
      id: '6',
      diaSemana: 'Segunda',
      horario: '19:00',
      tipo: 'Normal'
    },
    // Terça
    {
      id: '7',
      diaSemana: 'Terça',
      horario: '07:00',
      tipo: 'Normal'
    },
    {
      id: '8',
      diaSemana: 'Terça',
      horario: '19:00',
      tipo: 'Normal',
      observacao: 'Com Adoração ao Santíssimo'
    },
    // Quarta
    {
      id: '9',
      diaSemana: 'Quarta',
      horario: '07:00',
      tipo: 'Normal'
    },
    {
      id: '10',
      diaSemana: 'Quarta',
      horario: '19:00',
      tipo: 'Normal'
    },
    // Quinta
    {
      id: '11',
      diaSemana: 'Quinta',
      horario: '07:00',
      tipo: 'Normal'
    },
    {
      id: '12',
      diaSemana: 'Quinta',
      horario: '19:00',
      tipo: 'Normal',
      observacao: 'Com Novena Perpétua'
    },
    // Sexta
    {
      id: '13',
      diaSemana: 'Sexta',
      horario: '07:00',
      tipo: 'Normal'
    },
    {
      id: '14',
      diaSemana: 'Sexta',
      horario: '19:00',
      tipo: 'Normal',
      observacao: 'Com Via-Sacra (durante a Quaresma)'
    },
    // Sábado
    {
      id: '15',
      diaSemana: 'Sábado',
      horario: '08:00',
      tipo: 'Normal'
    },
    {
      id: '16',
      diaSemana: 'Sábado',
      horario: '19:00',
      tipo: 'Normal',
      observacao: 'Missa do Sábado - válida como Domingo'
    }
  ],
  eventosRecorrentes: [
    {
      id: '1',
      titulo: 'Adoração ao Santíssimo',
      diaSemana: 'Terça-feira',
      frequencia: 'Semanal',
      horario: '20:00',
      local: 'Capela do Santíssimo',
      descricao: 'Momento de adoração eucarística com músicas de louvor e oração',
      icone: 'mdi:church'
    },
    {
      id: '2',
      titulo: 'Novena Perpétua',
      diaSemana: 'Quinta-feira',
      frequencia: 'Semanal',
      horario: '20:00',
      local: 'Igreja Matriz',
      descricao: 'Novena em honra a Nossa Senhora do Perpétuo Socorro',
      icone: 'mdi:rosary'
    },
    {
      id: '3',
      titulo: 'Grupo de Oração',
      diaSemana: 'Quarta-feira',
      frequencia: 'Semanal',
      horario: '20:00',
      local: 'Salão Paroquial',
      descricao: 'Reunião semanal de oração com músicas e partilha da palavra',
      icone: 'mdi:account-group'
    },
    {
      id: '4',
      titulo: 'Catequese Infantil',
      diaSemana: 'Sábado',
      frequencia: 'Semanal',
      horario: '09:00',
      local: 'Salas de Catequese',
      descricao: 'Catequese para crianças de 7 a 12 anos',
      icone: 'mdi:human-child'
    },
    {
      id: '5',
      titulo: 'Catequese de Crisma',
      diaSemana: 'Sábado',
      frequencia: 'Semanal',
      horario: '15:00',
      local: 'Salão Paroquial',
      descricao: 'Preparação para o Sacramento da Crisma (adolescentes e adultos)',
      icone: 'mdi:book-cross'
    },
    {
      id: '6',
      titulo: 'Terço Mariano',
      frequencia: 'Diário',
      horario: '18:30',
      local: 'Igreja Matriz',
      descricao: 'Reza do Santo Terço antes da Missa vespertina',
      icone: 'mdi:rosary'
    }
  ],
  pastorais: [
    {
      id: '1',
      nome: 'Pastoral da Criança',
      descricao: 'Acompanhamento de gestantes e crianças de 0 a 6 anos, promovendo o desenvolvimento integral das crianças',
      coordenador: 'Maria Santos',
      contato: 'crianca@paroquiansgpe.org.br | (11) 98765-4321',
      ativa: true
    },
    {
      id: '2',
      nome: 'Pastoral da Juventude',
      descricao: 'Evangelização e formação humana e cristã dos jovens',
      coordenador: 'João Silva',
      contato: 'juventude@paroquiansgpe.org.br | (11) 98765-4322',
      ativa: true
    },
    {
      id: '3',
      nome: 'Pastoral Familiar',
      descricao: 'Apoio e orientação às famílias, preparação para o matrimônio',
      coordenador: 'José e Ana Costa',
      contato: 'familia@paroquiansgpe.org.br | (11) 98765-4323',
      ativa: true
    },
    {
      id: '4',
      nome: 'Pastoral da Saúde',
      descricao: 'Visita a doentes e idosos, levando o conforto espiritual e material',
      coordenador: 'Dra. Teresa Lima',
      contato: 'saude@paroquiansgpe.org.br | (11) 98765-4324',
      ativa: true
    },
    {
      id: '5',
      nome: 'Pastoral Social',
      descricao: 'Assistência aos necessitados, bazar solidário e distribuição de cestas básicas',
      coordenador: 'Carlos Almeida',
      contato: 'social@paroquiansgpe.org.br | (11) 98765-4325',
      ativa: true
    },
    {
      id: '6',
      nome: 'Pastoral Litúrgica',
      descricao: 'Organização e animação das celebrações litúrgicas',
      coordenador: 'Pe. Francisco',
      contato: 'liturgia@paroquiansgpe.org.br | (11) 98765-4326',
      ativa: true
    },
    {
      id: '7',
      nome: 'Pastoral da Comunicação',
      descricao: 'Divulgação das atividades paroquiais através das redes sociais e mídias',
      coordenador: 'Lucas Ferreira',
      contato: 'comunicacao@paroquiansgpe.org.br | (11) 98765-4327',
      ativa: true
    },
    {
      id: '8',
      nome: 'Ministério de Música',
      descricao: 'Animação musical das celebrações litúrgicas',
      coordenador: 'Maestro Pedro',
      contato: 'musica@paroquiansgpe.org.br | (11) 98765-4328',
      ativa: true
    }
  ],
  ativa: true
}

/**
 * Notícias mockadas da paróquia
 */
export const mockNoticias: Noticia[] = [
  {
    id: '1',
    titulo: 'Festa de Nossa Senhora de Guadalupe',
    resumo: 'Celebrações especiais em honra à padroeira da paróquia nos dias 9 a 12 de dezembro',
    conteudo: `
      <p>Nossa paróquia se prepara para celebrar com grande alegria a festa de Nossa Senhora de Guadalupe, nossa padroeira.</p>
      
      <h3>Programação:</h3>
      <ul>
        <li><strong>09/12 (Sábado):</strong> Novena às 19h seguida de procissão</li>
        <li><strong>10/12 (Domingo):</strong> Missas às 7h, 9h, 11h (Solene) e 19h</li>
        <li><strong>11/12 (Segunda):</strong> Missa Festiva às 19h com Pe. José Maria</li>
        <li><strong>12/12 (Terça):</strong> Dia da Padroeira - Missas às 7h, 12h e 19h (Solene)</li>
      </ul>
      
      <p>Haverá leilão beneficente, barraquinhas de comidas típicas e apresentações culturais.</p>
      <p>Todos estão convidados a participar!</p>
    `,
    dataPublicacao: '2024-11-20T10:00:00Z',
    autor: 'Equipe Paroquial',
    categorias: ['Festas'],
    destaque: true,
    imagem: '/images/festa-guadalupe.jpg'
  },
  {
    id: '2',
    titulo: 'Inscrições Abertas para Catequese 2024',
    resumo: 'Abertas as inscrições para Catequese de Primeira Eucaristia e Crisma',
    conteudo: `
      <p>Estão abertas as inscrições para a Catequese 2024 em nossa paróquia.</p>
      
      <h3>Primeira Eucaristia:</h3>
      <ul>
        <li>Crianças a partir de 8 anos</li>
        <li>Encontros aos sábados das 9h às 10h30</li>
        <li>Duração: 2 anos</li>
      </ul>
      
      <h3>Crisma:</h3>
      <ul>
        <li>Adolescentes a partir de 14 anos e adultos</li>
        <li>Encontros aos sábados das 15h às 17h</li>
        <li>Duração: 2 anos</li>
      </ul>
      
      <h3>Documentos necessários:</h3>
      <ul>
        <li>Certidão de Batismo atualizada</li>
        <li>RG e CPF do catequizando</li>
        <li>Comprovante de residência</li>
        <li>1 foto 3x4</li>
      </ul>
      
      <p>Inscrições na secretaria paroquial até 15 de janeiro.</p>
    `,
    dataPublicacao: '2024-11-18T14:00:00Z',
    autor: 'Coordenação de Catequese',
    categorias: ['Catequese'],
    destaque: true,
    imagem: '/images/catequese.jpg'
  },
  {
    id: '3',
    titulo: 'Campanha do Agasalho 2024',
    resumo: 'Paróquia realiza campanha de arrecadação de roupas e cobertores para o inverno',
    conteudo: `
      <p>Nossa paróquia está realizando a Campanha do Agasalho 2024 para ajudar as famílias necessitadas a enfrentar o frio do inverno.</p>
      
      <h3>Doações aceitas:</h3>
      <ul>
        <li>Roupas de inverno (adulto e infantil)</li>
        <li>Cobertores e mantas</li>
        <li>Sapatos e tênis</li>
        <li>Toalhas</li>
      </ul>
      
      <p><strong>Importante:</strong> As roupas devem estar limpas e em bom estado de conservação.</p>
      
      <p>Doe na secretaria paroquial até 30 de maio.</p>
      
      <p>Sua solidariedade aquece corações! 💙</p>
    `,
    dataPublicacao: '2024-11-15T09:00:00Z',
    autor: 'Pastoral Social',
    categorias: ['Campanhas'],
    destaque: true,
    imagem: '/images/campanha-agasalho.jpg'
  },
  {
    id: '4',
    titulo: 'Retiro Espiritual para Jovens',
    resumo: 'Pastoral da Juventude organiza retiro de Carnaval com o tema "Jovem, Levanta-te!"',
    conteudo: `
      <p>A Pastoral da Juventude convida todos os jovens de 15 a 30 anos para o Retiro de Carnaval 2024.</p>
      
      <h3>Informações:</h3>
      <ul>
        <li><strong>Tema:</strong> "Jovem, Levanta-te! - Descobrindo o chamado de Deus"</li>
        <li><strong>Data:</strong> 9 a 12 de fevereiro de 2024</li>
        <li><strong>Local:</strong> Chácara Recanto da Paz</li>
        <li><strong>Investimento:</strong> R$ 250,00 (inclui hospedagem, alimentação e material)</li>
      </ul>
      
      <h3>Programação:</h3>
      <ul>
        <li>Palestras e dinâmicas de grupo</li>
        <li>Momentos de oração e louvor</li>
        <li>Missa de Envio</li>
        <li>Recreação e confraternização</li>
      </ul>
      
      <p>Inscrições limitadas! Garanta sua vaga na secretaria.</p>
    `,
    dataPublicacao: '2024-11-10T16:00:00Z',
    autor: 'Pastoral da Juventude',
    categorias: ['Eventos'],
    destaque: false,
    imagem: '/images/retiro-jovens.jpg'
  },
  {
    id: '5',
    titulo: 'Formação para Ministros Extraordinários',
    resumo: 'Curso de formação para novos Ministros Extraordinários da Comunhão Eucarística',
    conteudo: `
      <p>A Diocese de São Paulo, em parceria com nossa paróquia, oferece curso de formação para Ministros Extraordinários da Comunhão Eucarística.</p>
      
      <h3>Requisitos:</h3>
      <ul>
        <li>Ser católico praticante</li>
        <li>Estar em situação regular com a Igreja (casado pela Igreja ou solteiro)</li>
        <li>Ter disponibilidade para servir nas celebrações</li>
        <li>Idade mínima: 18 anos</li>
      </ul>
      
      <h3>Cronograma:</h3>
      <ul>
        <li><strong>Início:</strong> 15 de janeiro de 2024</li>
        <li><strong>Duração:</strong> 8 encontros semanais</li>
        <li><strong>Horário:</strong> Quartas-feiras das 20h às 21h30</li>
      </ul>
      
      <p>Procure o Pe. Francisco para mais informações.</p>
    `,
    dataPublicacao: '2024-11-05T11:00:00Z',
    autor: 'Pároco',
    categorias: ['Formação'],
    destaque: false,
    imagem: '/images/ministros.jpg'
  }
]

/**
 * Liturgia diária mockada
 */
export const mockLiturgiaDiaria: LiturgiaDiaria = {
  data: new Date().toISOString().split('T')[0]!,
  cor: 'verde',
  titulo: 'Tempo Comum',
  primeiraLeitura: {
    referencia: 'Livro do Gênesis 1,1-19',
    titulo: 'A Criação do Mundo',
    texto: `No princípio, Deus criou o céu e a terra. A terra estava sem forma e vazia; as trevas cobriam o abismo e o Espírito de Deus pairava sobre as águas.

Deus disse: "Faça-se a luz!" E a luz foi feita. Deus viu que a luz era boa, e separou a luz das trevas. À luz Deus chamou "dia", e às trevas, "noite". Houve uma tarde e uma manhã: primeiro dia.`
  },
  salmo: {
    referencia: 'Salmo 103',
    refrao: 'Bendize, ó minha alma, ao Senhor!',
    texto: `Bendize, ó minha alma, ao Senhor! Ó meu Deus e meu Senhor, como sois grande!
De majestade e esplendor vos revestis e de luz vos envolveis como num manto.`
  },
  segundaLeitura: {
    referencia: 'Carta de São Paulo aos Efésios 1,3-6.15-18',
    titulo: 'Bênçãos Espirituais em Cristo',
    texto: `Bendito seja Deus, Pai de nosso Senhor Jesus Cristo, que do alto do céu nos abençoou, em Cristo, com toda sorte de bênçãos espirituais!

Em Cristo, ele nos escolheu antes da criação do mundo, para sermos santos e irrepreensíveis em seu amor.`
  },
  evangelho: {
    referencia: 'Evangelho de São João 1,1-5.9-14',
    titulo: 'O Verbo se fez carne',
    texto: `No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus. No princípio, ele estava com Deus. Tudo foi feito por meio dele, e sem ele nada foi feito.

Nele havia vida, e a vida era a luz dos homens. A luz brilha nas trevas, e as trevas não conseguiram apagá-la.`
  }
}

/**
 * Gera liturgia diária baseada na data
 */
export const getLiturgiaDiaria = (data: string): LiturgiaDiaria => {
  const dataObj = new Date(data)
  const diaSemana = dataObj.getDay()
  
  // Domingo tem segunda leitura, outros dias não
  const liturgia: LiturgiaDiaria = {
    data,
    cor: diaSemana === 0 ? 'branco' : 'verde',
    titulo: diaSemana === 0 ? 'Domingo do Tempo Comum' : 'Tempo Comum',
    primeiraLeitura: mockLiturgiaDiaria.primeiraLeitura,
    salmo: mockLiturgiaDiaria.salmo,
    evangelho: mockLiturgiaDiaria.evangelho
  }
  
  if (diaSemana === 0) {
    liturgia.segundaLeitura = mockLiturgiaDiaria.segundaLeitura
  }
  
  return liturgia
}
