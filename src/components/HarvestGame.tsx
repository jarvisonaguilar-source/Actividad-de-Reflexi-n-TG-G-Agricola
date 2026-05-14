import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Truck, BookOpen, Target, AlertTriangle, CheckCircle2, XCircle, RotateCcw, Users, Sprout, Package, Calculator, Droplets, Wrench, BadgeDollarSign, Timer } from 'lucide-react';

type Challenge = {
  id: number;
  title: string;
  icon: React.ReactNode;
  situation: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
    learning: string;
  }[];
};

const challenges: Challenge[] = [
  {
    id: 1,
    title: "El Caos de la Recolección",
    icon: <Leaf className="w-6 h-6 text-emerald-500" />,
    situation: "Los recolectores están dispersos y algunos mangos premium se están sobre-madurando en los árboles.",
    options: [
      {
        text: "Ordenar que todos entren al lote más grande a recoger lo más rápido posible.",
        isCorrect: false,
        feedback: "¡Mucha fruta verde fue arrancada y los trabajadores se estorbaron!",
        learning: "La acción sin planificación genera cuellos de botella y merma de calidad en el producto."
      },
      {
        text: "Diseñar un cronograma por lotes de maduración, asignando turnos y metas diarias.",
        isCorrect: true,
        feedback: "¡Has optimizado la mano de obra!",
        learning: "El cronograma define el 'qué, quién y cuándo', maximizando la eficiencia operativa."
      },
      {
        text: "Dejar que los trabajadores elijan su propio ritmo y lote para mantenerlos contentos.",
        isCorrect: false,
        feedback: "¡El caos aumentó y mucha fruta se pudrió en los árboles!",
        learning: "La delegación total sin planificación estratégica lleva a la pérdida de control operativo."
      },
      {
        text: "Contratar el triple de personal por un día sin organizar cuadrillas.",
        isCorrect: false,
        feedback: "¡Los costos se dispararon y se estorbaron entre ellos pisando la fruta!",
        learning: "Aumentar los recursos sin un sistema de gestión logístico solo amplifica la ineficiencia."
      }
    ]
  },
  {
    id: 2,
    title: "El Desastre del Transporte",
    icon: <Truck className="w-6 h-6 text-blue-500" />,
    situation: "Hay 5 toneladas listas en canastillas, pero el transporte habitual canceló a última hora.",
    options: [
      {
        text: "Contratar una flota externa de camiones refrigerados y coordinar con el puerto.",
        isCorrect: true,
        feedback: "¡Exportación asegurada y a tiempo!",
        learning: "La gestión logística prevé recursos idóneos y sincroniza los eslabones de la cadena de suministro."
      },
      {
        text: "Usar las camionetas viejas de la finca para hacer múltiples viajes pequeños al puerto.",
        isCorrect: false,
        feedback: "¡La fruta llegó estropeada y perdiste la cadena de frío!",
        learning: "En agroexportación, la idoneidad del recurso (transporte especializado) justifica la inversión."
      },
      {
        text: "Dejar las canastillas al sol mientras se espera al transportista habitual en la tarde.",
        isCorrect: false,
        feedback: "¡El mango se deshidrató y perdió su calidad de exportación!",
        learning: "El manejo postcosecha es crítico; los tiempos de espera sin control de temperatura son letales."
      },
      {
        text: "Vender la fruta al pueblo más cercano a mitad de precio para no perderla.",
        isCorrect: false,
        feedback: "¡Perdiste todo el margen de ganancia de exportación innecesariamente!",
        learning: "Las decisiones de pánico ante fallas logísticas destruyen la rentabilidad planificada."
      }
    ]
  },
  {
    id: 3,
    title: "Las Servilletas de Don Ricardo",
    icon: <BookOpen className="w-6 h-6 text-amber-500" />,
    situation: "No sabes qué insumos se han pagado porque los recibos están anotados en los bolsillos del mayoral.",
    options: [
      {
        text: "Guardar las servilletas en una caja fuerte para contarlas a fin de mes.",
        isCorrect: false,
        feedback: "¡Te quedaste sin liquidez para pagar la nómina semanal!",
        learning: "La falta de trazabilidad financiera inmediata impide la toma de decisiones oportunas."
      },
      {
        text: "Implementar inmediatamente un formato de registro diario y un Kardex digital.",
        isCorrect: true,
        feedback: "¡Flujo de caja estabilizado y transparente!",
        learning: "La información estructurada permite medir el costo real y la rentabilidad de la cosecha."
      },
      {
        text: "Pedirle al mayoral que memorice los gastos y te los cuente el fin de semana.",
        isCorrect: false,
        feedback: "¡Olvidó la mitad de las compras y descuadró la caja menor!",
        learning: "La memoria humana no es una herramienta de gestión financiera aceptable en agronegocios."
      },
      {
        text: "Tirar las servilletas y empezar a anotar desde hoy ignorando el pasado.",
        isCorrect: false,
        feedback: "¡La contabilidad quedó descuadrada y no sabes cuánto perdiste!",
        learning: "La pérdida de datos históricos impide calcular el costo real de producción o Punto de Equilibrio."
      }
    ]
  },
  {
    id: 4,
    title: "Rebelión en las Cuadrillas",
    icon: <Users className="w-6 h-6 text-purple-500" />,
    situation: "El rendimiento bajó. La mitad de los trabajadores llega tarde y tiran las canastillas.",
    options: [
      {
        text: "Establecer incentivos por calidad y organizar pausas de hidratación.",
        isCorrect: true,
        feedback: "¡El equipo está motivado y cuida el producto!",
        learning: "El área de RRHH en agricultura es vital; el bienestar laboral aumenta directamente el rendimiento."
      },
      {
        text: "Amenazar con descontar sueldo y aumentar la hora de salida.",
        isCorrect: false,
        feedback: "¡Los mejores trabajadores renunciaron en plena cosecha!",
        learning: "El liderazgo coercitivo destruye el clima organizacional y eleva los costos de contratación."
      },
      {
        text: "Ignorar el problema y asumir que es por el calor de la temporada.",
        isCorrect: false,
        feedback: "¡El rendimiento bajó un 40% más y aumentaron los accidentes!",
        learning: "El absentismo y la mala calidad son síntomas de alertas administrativas que deben gestionarse de inmediato."
      },
      {
        text: "Despedir a todos y traer trabajadores novatos de otra ciudad.",
        isCorrect: false,
        feedback: "¡La curva de aprendizaje retrasó la cosecha dos semanas y se pudrió la fruta!",
        learning: "La rotación masiva de personal en picos de demanda es financieramente inviable y operativamente riesgosa."
      }
    ]
  },
  {
    id: 5,
    title: "Embotellamiento en Acopio",
    icon: <Package className="w-6 h-6 text-orange-500" />,
    situation: "Llegaron 10 toneladas de mango de golpe, pero solo hay 3 operarios en la zona de limpieza.",
    options: [
      {
        text: "Detener la recolección en campo hasta limpiar el acopio actual.",
        isCorrect: false,
        feedback: "¡El mango en el árbol sobrepasó sus grados Brix para exportación!",
        learning: "Detener un eslabón sin redistribuir recursos es un fallo de balance de líneas."
      },
      {
        text: "Reasignar temporalmente personal de campo a empaque y solicitar turno nocturno.",
        isCorrect: true,
        feedback: "¡Rotación ágil! Sacaste el cargamento a tiempo.",
        learning: "La gestión de operaciones requiere flexibilidad y rebalanceo de capacidades en tiempo real."
      },
      {
        text: "Exigir a los 3 operarios actuales que trabajen el triple de rápido.",
        isCorrect: false,
        feedback: "¡La fruta quedó mal lavada y los trabajadores sufrieron fatiga extrema!",
        learning: "La presión gerencial no reemplaza la capacidad instalada física de un proceso productivo."
      },
      {
        text: "Apilar el mango sucio en una esquina del galpón y esperar a mañana.",
        isCorrect: false,
        feedback: "¡El calor generado por la gran pila de mango aceleró su pudrición!",
        learning: "El almacenamiento inadecuado crea mermas masivas; el flujo de proceso debe ser continuo."
      }
    ]
  },
  {
    id: 6,
    title: "Déficit de Canastillas",
    icon: <Calculator className="w-6 h-6 text-red-500" />,
    situation: "Se esperaba empacar hoy pero no hay suficientes canastillas desinfectadas.",
    options: [
      {
        text: "Auditar el inventario, proyectar consumo y firmar acuerdo con un proveedor local.",
        isCorrect: true,
        feedback: "¡Almacén abastecido y proyecciones cubiertas!",
        learning: "La gestión de compras basada en proyecciones (MRP) evita paros de producción."
      },
      {
        text: "Comprar canastillas de segunda mano sin desinfectar para salir del paso.",
        isCorrect: false,
        feedback: "¡Brote de hongos! El lote entero fue rechazado en aduana.",
        learning: "Ignorar protocolos fitosanitarios por ahorrar dinero resulta en pérdidas catastróficas."
      },
      {
        text: "Usar costales o sacos de lona para empacar el mango de exportación temporalmente.",
        isCorrect: false,
        feedback: "¡El mango se magulló completamente por fricción y presión!",
        learning: "El empaque inadecuado destruye la calidad física del producto, devaluándolo para mercados exigentes."
      },
      {
        text: "Enviar al supervisor al pueblo para comprar canastillas de ferretería al detal.",
        isCorrect: false,
        feedback: "¡Compró materiales no aptos para alimentos y a precios altísimos!",
        learning: "Las compras reactivas (fuera de política de abastecimiento) elevan costos y no garantizan especificaciones técnicas."
      }
    ]
  },
  {
    id: 7,
    title: "Tractores Varados",
    icon: <Wrench className="w-6 h-6 text-slate-500" />,
    situation: "El tractor principal se averió porque nunca se le cambió el aceite a tiempo.",
    options: [
      {
        text: "Implementar un plan de Mantenimiento Preventivo con bitácoras por máquina.",
        isCorrect: true,
        feedback: "¡Maquinaria operativa y costos mecánicos reducidos!",
        learning: "El Mantenimiento Preventivo prolonga la vida útil de los activos y reduce tiempos muertos."
      },
      {
        text: "Llamar al mecánico de emergencia cada vez que algo hace ruido.",
        isCorrect: false,
        feedback: "¡Pagaste tarifas de urgencia carísimas y el tractor falló de nuevo!",
        learning: "El Mantenimiento Correctivo exclusivo es la estrategia más costosa en la gestión de activos."
      },
      {
        text: "Obligar al tractorista a pagar por el daño del motor de su salario.",
        isCorrect: false,
        feedback: "¡El empleado renunció y el sindicato intervino, paralizando la cosecha!",
        learning: "Trasladar responsabilidades administrativas por falta de protocolos al nivel operativo revela fallas gerenciales."
      },
      {
        text: "Comprar un tractor nuevo de contado inmediatamente para avanzar rápido.",
        isCorrect: false,
        feedback: "¡Te descapitalizaste por completo y ya no hay para la nómina!",
        learning: "Sustituir activos de alto valor por fallas de mantenimiento interrumpe drásticamente el flujo de caja."
      }
    ]
  },
  {
    id: 8,
    title: "Sequía en el Lote 4",
    icon: <Droplets className="w-6 h-6 text-cyan-500" />,
    situation: "El lote más joven muestra estrés hídrico. El operario riega 'a ojo' cuando lo ve seco.",
    options: [
      {
        text: "Instalar tensiómetros y basar el riego en datos técnicos de humedad del suelo.",
        isCorrect: true,
        feedback: "¡Raíces salvadas e hidratación perfecta!",
        learning: "La agricultura de precisión usa indicadores medibles para optimizar el recurso hídrico."
      },
      {
        text: "Inundar el lote con el doble de agua para que 'aguante' más días.",
        isCorrect: false,
        feedback: "¡Asfixia radicular! Los árboles tiraron la flor.",
        learning: "Las decisiones agronómicas viscerales ignoran la capacidad de retención y aireación del suelo."
      },
      {
        text: "Establecer un cronograma rígido de riego fijo semanal sin importar el clima.",
        isCorrect: false,
        feedback: "¡Llovió y el riego automático extra provocó infecciones por hongos!",
        learning: "La programación estática sin retroalimentación agroclimática causa sobrecostos e ineficiencia."
      },
      {
        text: "Esperar siempre a que las hojas se marchiten para confirmar que necesitan agua.",
        isCorrect: false,
        feedback: "¡Para cuando regaste, el estrés fisiológico ya había tirado la mitad de los frutitos!",
        learning: "Actuar solo ante síntomas visibles de estrés significa que el daño al rendimiento económico ya está hecho."
      }
    ]
  },
  {
    id: 9,
    title: "El Canto del Intermediario",
    icon: <BadgeDollarSign className="w-6 h-6 text-yellow-500" />,
    situation: "Un comprador local ofrece comprar toda la cosecha en efectivo, pero un 30% más barato que la exportadora.",
    options: [
      {
        text: "Aceptar el dinero rápido y olvidarse de los papeleos de exportación.",
        isCorrect: false,
        feedback: "¡No cubriste los costos operativos y perdiste el esfuerzo del año!",
        learning: "Ceder el margen de comercialización al intermediario destruye la rentabilidad del cultivo."
      },
      {
        text: "Mantener el contrato de exportación y asegurar logística, validando márgenes.",
        isCorrect: true,
        feedback: "¡Venta internacional completada con alta rentabilidad!",
        learning: "La gestión comercial debe buscar mercados de alto valor gestionando el riesgo."
      },
      {
        text: "Entregarle la mitad de la cosecha al intermediario para tener 'efectivo seguro'.",
        isCorrect: false,
        feedback: "¡Incumpliste el volumen del contrato de exportación y fuiste multado duramente!",
        learning: "Incumplir cuotas de contratos internacionales genera penalidades formales y pérdida total de reputación."
      },
      {
        text: "Mentir al comprador internacional alegando plagas y vender todo localmente.",
        isCorrect: false,
        feedback: "¡El importador envió un perito, descubrió el fraude y te demandó!",
        learning: "La falta de ética empresarial y transparencia comercial cierra permanentemente los mercados premium."
      }
    ]
  },
  {
    id: 10,
    title: "Preparando el Futuro",
    icon: <Target className="w-6 h-6 text-indigo-600" />,
    situation: "Se salvó gran parte de la cosecha actual, pero los pronósticos indican que el próximo año habrá fenómeno de El Niño.",
    options: [
      {
        text: "Crear un Plan Operativo Anual (POA) que reserve utilidades para sistemas de riego.",
        isCorrect: true,
        feedback: "¡Finca asegurada para la próxima temporada!",
        learning: "La planeación estratégica convierte la incertidumbre climática en riesgos calculados y mitigables."
      },
      {
        text: "Gastar las utilidades de este año y esperar a ver cómo se comporta el clima.",
        isCorrect: false,
        feedback: "¡Gestión reactiva, el próximo año estarás en crisis nuevamente!",
        learning: "No anticipar riesgos estructurales de clima condena al proyecto al fracaso eventual."
      },
      {
        text: "Talar los árboles de mango y reemplazarlos por cactus para no usar agua.",
        isCorrect: false,
        feedback: "¡Perdiste 5 años de inversión en cultivos perennes por una decisión de pánico!",
        learning: "Las reestructuraciones drásticas del modelo de negocio por pánico son el mayor error de la gerencia estratégica."
      },
      {
        text: "Depender de pedir un préstamo de urgencia al banco si el verano es muy fuerte.",
        isCorrect: false,
        feedback: "¡Las altas tasas de interés de emergencia hundieron la rentabilidad a números rojos!",
        learning: "La financiación reactiva (no planificada) suele darse en condiciones perjudiciales para la sostenibilidad de la empresa."
      }
    ]
  }
];

const CropVisualizer = ({ score }: { score: number }) => {
  let treeColor = 'bg-emerald-500';
  let leafColor = 'bg-emerald-400';
  let fruitColor = 'bg-orange-500';
  let trunkColor = 'bg-amber-800';
  let fruitCount = 5;
  let skyColor = 'bg-sky-200';
  let groundColor = 'bg-emerald-700';

  if (score < 50) {
    treeColor = 'bg-stone-500';
    leafColor = 'bg-stone-400';
    fruitColor = 'bg-stone-700'; 
    fruitCount = 0;
    skyColor = 'bg-slate-300';
    groundColor = 'bg-stone-600';
  } else if (score < 80) {
    treeColor = 'bg-lime-600';
    leafColor = 'bg-lime-500';
    fruitColor = 'bg-amber-500';
    fruitCount = 2;
    skyColor = 'bg-sky-100';
    groundColor = 'bg-emerald-600';
  }

  return (
    <div className={`w-full h-40 md:h-48 ${skyColor} rounded-3xl relative overflow-hidden flex items-end justify-around pb-4 border-b-8 ${groundColor} transition-colors duration-1000 shadow-inner mb-6 shrink-0`}>
      {score >= 50 && <div className="absolute top-4 right-8 w-10 h-10 md:w-14 md:h-14 bg-yellow-300 rounded-full opacity-90 shadow-[0_0_20px_rgba(253,224,71,0.8)]"></div>}
      {score < 50 && <div className="absolute top-0 inset-x-0 h-12 bg-slate-500 opacity-40 blur-md"></div>}

      {[1, 2, 3].map((treeIndex) => (
        <div key={treeIndex} className="relative flex flex-col items-center">
          <div className={`w-16 h-16 md:w-20 md:h-20 ${treeColor} rounded-full absolute -top-12 md:-top-16 shadow-lg flex items-center justify-center`}>
             <div className={`absolute top-0 right-1 w-8 h-8 md:w-10 md:h-10 ${leafColor} rounded-full`}></div>
             <div className={`absolute bottom-2 left-1 w-6 h-6 md:w-8 md:h-8 ${leafColor} rounded-full`}></div>
             {Array.from({length: fruitCount}).map((_, i) => (
                <div key={i} className={`absolute w-2 h-2 md:w-3 md:h-3 ${fruitColor} rounded-full shadow-sm`}
                     style={{ top: `${20 + (i * 20)}%`, left: `${20 + (i * 25)}%` }}></div>
             ))}
          </div>
          <div className={`w-4 h-12 md:h-16 ${trunkColor} rounded-sm`}></div>
          {score < 50 && (
            <div className="absolute -bottom-1 flex gap-2">
              <div className="w-2 h-2 bg-stone-800 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-stone-900 rounded-full"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function HarvestGame() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'feedback' | 'end' | 'timeout'>('intro');
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [score, setScore] = useState(100);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [answerHistory, setAnswerHistory] = useState<{id: number, isCorrect: boolean}[]>([]);
  const [gameChallenges, setGameChallenges] = useState<Challenge[]>(challenges);
  const [learnerName, setLearnerName] = useState('');
  const [learnerId, setLearnerId] = useState('');
  
  const currentChallenge = gameChallenges[currentChallengeIndex];

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if ((gameState === 'playing' || gameState === 'feedback') && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && (gameState === 'playing' || gameState === 'feedback')) {
      setGameState('timeout');
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState, timeLeft]);

  const handleStart = () => {
    const shuffledChallenges = [...challenges]
      .sort(() => Math.random() - 0.5)
      .map(challenge => ({
        ...challenge,
        options: [...challenge.options].sort(() => Math.random() - 0.5)
      }));

    setGameChallenges(shuffledChallenges);
    setGameState('playing');
    setScore(100);
    setCurrentChallengeIndex(0);
    setTimeLeft(600);
    setAnswerHistory([]);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    const isCorrect = currentChallenge.options[index].isCorrect;
    
    setAnswerHistory(prev => [...prev, { id: currentChallenge.id, isCorrect }]);

    if (!isCorrect) {
      setScore(prev => Math.max(0, prev - 20));
    }
    setGameState('feedback');
  };

  const renderConclusion = () => {
    const failedIds = answerHistory.filter(a => !a.isCorrect).map(a => a.id);
    const passedIds = answerHistory.filter(a => a.isCorrect).map(a => a.id);

    if (answerHistory.length === 0) return "No se registraron decisiones.";

    let conclusionText = "";
    if (score === 100) {
      conclusionText = "¡Impecable! Tu dominio integral de las áreas administrativas ha llevado a 'La Excelencia' a su máximo potencial de rentabilidad agroexportadora. ";
    } else if (score < 50) {
      conclusionText = "La finca ha colapsado operativa y financieramente. ";
    } else {
      conclusionText = "Has logrado salvar la finca, pero las ineficiencias mermaron significativamente la rentabilidad esperada. ";
    }

    if (failedIds.length > 0 && score < 100) {
      const issues = [];
      if (failedIds.some(id => [1, 10].includes(id))) issues.push("planeación y estrategia a largo plazo fueron deficientes");
      if (failedIds.some(id => [2, 5, 6].includes(id))) issues.push("cuellos de botella logísticos y operativos");
      if (failedIds.some(id => [3, 9].includes(id))) issues.push("malas decisiones comerciales generaron fugas de capital");
      if (failedIds.some(id => [4].includes(id))) issues.push("se penalizó el clima laboral agravando la productividad");
      if (failedIds.some(id => [7, 8].includes(id))) issues.push("faltaron criterios técnicos para el mantenimiento agrícola");

      conclusionText += "Debes mejorar porque tus decisiones provocaron: " + issues.join(", ") + ". ";
    }

    if (passedIds.length > 0 && score < 100 && score >= 50) {
      conclusionText += "Aún así, tus aciertos en otras áreas evitaron la bancarrota total, recordando que la agrogestión requiere un balance perfecto.";
    }

    return (
      <p className="text-slate-700 italic font-medium leading-relaxed">
        "{conclusionText}"
      </p>
    );
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < gameChallenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      setGameState('playing');
      setSelectedOption(null);
    } else {
      setGameState('end');
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col font-sans overflow-hidden border-[8px] border-emerald-600">
      {/* Header Section */}
      <header className="bg-emerald-600 p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center text-white shadow-lg z-10 relative gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter">MISIÓN: RESCATE DE LA EXCELENCIA</h1>
          <p className="text-xs md:text-sm font-medium opacity-90">Simulación de Gestión Administrativa Agrícola</p>
        </div>
        <div className="flex gap-4 items-center">
          {gameState !== 'intro' && gameState !== 'end' && gameState !== 'timeout' && (
            <div className="bg-emerald-800 px-3 py-1.5 md:px-4 md:py-2 rounded-xl flex items-center gap-2 shadow-inner border border-emerald-700">
              <Timer className="w-4 h-4 md:w-5 md:h-5 text-emerald-300" />
              <span className={`font-mono text-lg md:text-xl font-bold ${timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-emerald-100'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          )}
          {gameState !== 'intro' ? (
            <>
              <div className="bg-emerald-800 px-4 py-2 rounded-full hidden md:flex items-center gap-2">
                <span className="text-xs font-bold uppercase">Nivel de Salud:</span>
                <div className="w-32 h-3 bg-red-400 rounded-full overflow-hidden">
                  <div 
                    className="bg-red-600 h-full shadow-[0_0_10px_#ef4444] transition-all duration-500"
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-amber-400 text-emerald-950 px-6 py-2 rounded-xl font-black text-xl shadow-md">
                {score} pts
              </div>
            </>
          ) : (
            <div className="bg-amber-400 text-emerald-950 px-4 py-2 rounded-xl font-black text-sm uppercase shadow-md">
              Misión Bloqueada
            </div>
          )}
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-6 overflow-y-auto">
        
        {/* Sidebar: Narrativa y Reglas */}
        <section className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-amber-400 flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full border-2 border-amber-500 flex items-center justify-center text-3xl">👨‍🌾</div>
              <h2 className="text-xl font-bold text-emerald-900">Don Ricardo dice:</h2>
            </div>
            <p className="text-emerald-800 leading-relaxed italic mb-4">
              "¡Tecnólogo en gestión agrícola! Mi cosecha récord de mango se está perdiendo. No tengo camiones, los trabajadores no saben qué hacer y las facturas volaron con el viento. ¡Ayúdeme a salvar la finca!"
            </p>
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase text-emerald-600">Mecánica de Juego:</h3>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2 text-emerald-900"><span className="text-amber-500">✔</span> 10 Retos Críticos Administrativos.</li>
                <li className="flex items-start gap-2 text-emerald-900"><span className="text-amber-500">✔</span> Evita que la salud de la finca baje a 0.</li>
                <li className="flex items-start gap-2 text-emerald-900"><span className="text-amber-500">✔</span> Decisiones erróneas restan 20 puntos.</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-emerald-100 rounded-2xl p-4 border-2 border-emerald-200 hidden lg:block shadow-sm">
            <h3 className="text-xs font-black uppercase text-emerald-700 mb-2">Progreso de la Misión</h3>
            <div className="flex gap-2 w-full">
              {gameChallenges.map((_, i) => (
                <div key={i} className={`h-2 rounded-full flex-1 ${i <= currentChallengeIndex && gameState !== 'intro' && gameState !== 'end' ? 'bg-emerald-500' : 'bg-white'}`}></div>
              ))}
            </div>
          </div>
        </section>

        {/* Central Area: Desafíos Interactivos */}
        <section className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border-4 border-sky-400 flex-1 relative overflow-hidden flex flex-col">
            
            {(gameState === 'playing' || gameState === 'feedback') && (
              <div className="absolute top-0 right-0 bg-sky-400 text-white px-6 py-2 rounded-bl-3xl font-bold uppercase text-[10px] md:text-sm tracking-widest z-10 shadow-sm">
                Reto {currentChallengeIndex + 1}
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* INTRO STATE */}
              {gameState === 'intro' && (
                <motion.div 
                  key="intro"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col h-full justify-center"
                >
                  <h2 className="text-3xl font-black text-emerald-900 mb-6 mt-4">PREPARACIÓN PARA EL RESCATE</h2>
                  <p className="text-slate-600 justify-content leading-relaxed mb-6">
                    Asume el rol de Gerente de Intervención. Tienes la tarea de aplicar conceptos técnicos de gestión agrícola 
                    para resolver 10 desórdenes críticos en Finca "La Excelencia". Comenzarás con 100 puntos de salud.
                  </p>

                  <div className="flex flex-col gap-4 mb-8 bg-sky-50 p-6 rounded-2xl border-2 border-sky-100 shrink-0">
                    <h3 className="text-sm font-black text-sky-800 uppercase tracking-wider mb-2">Identificación del Aprendiz</h3>
                    
                    <div className="flex flex-col gap-1">
                      <label htmlFor="learnerName" className="text-xs font-bold text-sky-900 uppercase">Nombres y Apellidos</label>
                      <input 
                        id="learnerName"
                        type="text" 
                        value={learnerName}
                        onChange={(e) => setLearnerName(e.target.value)}
                        placeholder="Ej: Juan Pérez"
                        className="p-3 rounded-xl border border-sky-200 outline-none focus:ring-2 focus:ring-sky-400 font-medium text-slate-700 w-full"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <label htmlFor="learnerId" className="text-xs font-bold text-sky-900 uppercase">Documento de Identidad</label>
                      <input 
                        id="learnerId"
                        type="text" 
                        value={learnerId}
                        onChange={(e) => setLearnerId(e.target.value)}
                        placeholder="Ej: 1020304050"
                        className="p-3 rounded-xl border border-sky-200 outline-none focus:ring-2 focus:ring-sky-400 font-medium text-slate-700 w-full"
                      />
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleStart}
                    disabled={!learnerName.trim() || !learnerId.trim()}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:transform-none text-white font-black text-lg py-5 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 mt-auto shrink-0"
                  >
                    INICIAR INTERVENCIÓN
                  </button>
                </motion.div>
              )}

              {/* PLAYING STATE */}
              {gameState === 'playing' && (
                <motion.div
                  key={`challenge-${currentChallengeIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col flex-1"
                >
                  <div className="flex items-start gap-4 mb-4 mt-8">
                    <div className="bg-sky-100 p-4 rounded-full border-2 border-sky-200">
                      {currentChallenge.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-emerald-900">{currentChallenge.title}</h2>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-lg leading-relaxed mb-8">
                    {currentChallenge.situation}
                  </p>

                  <div className="grid grid-cols-1 gap-4 mt-auto">
                    {currentChallenge.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                        className="group w-full text-left p-4 rounded-2xl border-2 border-slate-200 hover:border-sky-500 hover:bg-sky-50 transition-all flex justify-between items-center"
                      >
                        <span className="font-bold text-slate-700 group-hover:text-sky-700 text-[15px] md:text-lg pr-4">{option.text}</span>
                        <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">👉</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* FEEDBACK STATE */}
              {gameState === 'feedback' && selectedOption !== null && (
                <motion.div
                  key="feedback"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col flex-1"
                >
                  <div className="flex items-start gap-4 mb-4 mt-8">
                    <div className={`${currentChallenge.options[selectedOption].isCorrect ? 'bg-emerald-100 border-emerald-500 text-emerald-600' : 'bg-red-100 border-red-500 text-red-600'} p-3 rounded-full border-2`}>
                      {currentChallenge.options[selectedOption].isCorrect ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                    </div>
                    <div>
                      <h2 className={`text-2xl font-black ${currentChallenge.options[selectedOption].isCorrect ? 'text-emerald-900' : 'text-red-900'} uppercase`}>
                         {currentChallenge.options[selectedOption].isCorrect ? 'Decisión Correcta' : 'Error Administrativo'}
                      </h2>
                      {!currentChallenge.options[selectedOption].isCorrect && (
                        <p className="text-red-700 font-bold">-20 Puntos</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 mb-4">
                     <p className="text-lg font-bold text-slate-700 mb-2">
                        "{currentChallenge.options[selectedOption].text}"
                     </p>
                     <p className="text-slate-600 font-medium">
                       {currentChallenge.options[selectedOption].feedback}
                     </p>
                  </div>

                  <div className="bg-emerald-700 rounded-2xl p-6 text-white shadow-inner mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-emerald-500 p-1.5 rounded-lg"><BookOpen className="w-5 h-5 text-white" /></span>
                      <h4 className="font-bold uppercase text-sm tracking-wider">Lección Técnica:</h4>
                    </div>
                    <p className="text-emerald-100 text-sm md:text-base leading-relaxed">
                      {currentChallenge.options[selectedOption].learning}
                    </p>
                  </div>

                  <button 
                    onClick={handleNextChallenge}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black hover:text-sky-300 text-lg py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl mt-auto"
                  >
                    {currentChallengeIndex < challenges.length - 1 ? 'SIGUIENTE DESAFÍO 👉' : 'VER RESULTADOS FINALES 📊'}
                  </button>
                </motion.div>
              )}

              {/* TIMEOUT STATE */}
              {gameState === 'timeout' && (
                <motion.div
                  key="timeout"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col flex-1 items-center text-center py-4"
                >
                  <CropVisualizer score={score} />
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 border-4 border-red-400 rounded-full mb-4 shadow-lg shrink-0">
                    <Timer className="w-8 h-8 text-red-600" />
                  </div>
                  
                  <h2 className="text-3xl font-black text-emerald-900 mb-2">
                    ¡TIEMPO AGOTADO!
                  </h2>
                  
                  <div className="bg-sky-100 px-4 py-2 rounded-xl mb-4 text-sm font-bold text-sky-900 uppercase tracking-wider">
                    Aprendiz: {learnerName} ({learnerId})
                  </div>
                  
                  <p className="text-xl font-bold text-slate-600 uppercase mb-6">
                    Puntaje Final: <span className={`${score >= 50 ? 'text-emerald-600' : 'text-red-600'}`}>{score} pts</span>
                  </p>

                  <div className="bg-amber-50 rounded-2xl border-2 border-dashed border-amber-300 p-6 text-left w-full mb-8">
                    <h3 className="text-xs font-black uppercase text-amber-700 mb-3">Análisis de Desempeño Parcial</h3>
                    {renderConclusion()}
                    <p className="text-red-700 italic font-bold mt-4">
                      * El tiempo es crítico en agronomía. Perder la ventana fisiológica y logística invalidó gran parte del esfuerzo restante.
                    </p>
                  </div>

                  <button 
                    onClick={handleStart}
                    className="flex justify-center items-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg py-4 px-8 rounded-2xl transition-all shadow-lg hover:translate-y-[-2px] mt-auto shrink-0"
                  >
                    <RotateCcw className="w-5 h-5" />
                    REINICIAR SIMULACIÓN
                  </button>
                </motion.div>
              )}

              {/* END STATE */}
              {gameState === 'end' && (
                <motion.div
                  key="end"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col flex-1 items-center text-center py-4"
                >
                  <CropVisualizer score={score} />
                  
                  <div className={`inline-flex items-center justify-center w-16 h-16 shrink-0 mt-2 ${score >= 50 ? 'bg-amber-100 border-4 border-amber-400' : 'bg-red-100 border-4 border-red-400'} rounded-full mb-4 shadow-lg`}>
                    {score >= 50 ? <span className="text-3xl">🏆</span> : <AlertTriangle className="w-8 h-8 text-red-600" />}
                  </div>
                  
                  <h2 className="text-3xl font-black text-emerald-900 mb-2">
                    {score >= 50 ? '¡COSECHA SALVADA!' : 'FINCA EN BANCARROTA'}
                  </h2>
                  
                  <div className="bg-sky-100 px-4 py-2 rounded-xl mb-4 text-sm font-bold text-sky-900 uppercase tracking-wider">
                    Aprendiz: {learnerName} ({learnerId})
                  </div>
                  
                  <p className="text-xl font-bold text-slate-600 uppercase mb-6">
                    Puntaje Final: <span className={`${score >= 50 ? 'text-emerald-600' : 'text-red-600'}`}>{score} pts</span>
                  </p>

                  <div className="bg-amber-50 rounded-2xl border-2 border-dashed border-amber-300 p-6 text-left w-full mb-8">
                    <h3 className="text-xs font-black uppercase text-amber-700 mb-3">Análisis de Desempeño</h3>
                    {renderConclusion()}
                  </div>

                  <button 
                    onClick={handleStart}
                    className="flex justify-center items-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg py-4 px-8 rounded-2xl transition-all shadow-lg hover:translate-y-[-2px] mt-auto shrink-0"
                  >
                    <RotateCcw className="w-5 h-5" />
                    REINICIAR SIMULACIÓN
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>
      </main>

      {/* Bottom Bar Optional */}
      <footer className="bg-emerald-950 p-2 md:p-4 text-center text-emerald-50 shrink-0">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium opacity-80">
           Simulación de Aprendizaje Interactivo • Gestión Agrícola
        </p>
      </footer>
    </div>
  );
}
