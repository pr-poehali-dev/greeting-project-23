import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Combine {
  id: number;
  rank: number;
  name: string;
  manufacturer: string;
  image: string;
  price: string;
  specs: {
    power: string;
    capacity: string;
    tankVolume: string;
    weight: string;
    width: string;
  };
  features: string[];
}

const combines: Combine[] = [
  {
    id: 1,
    rank: 1,
    name: 'CLAAS LEXION 8900',
    manufacturer: 'CLAAS',
    image: 'https://cdn.poehali.dev/files/e9186d5a-6c31-40a3-857d-01805e536dec.jpg',
    price: '24 500 000 ₽',
    specs: {
      power: '790 л.с.',
      capacity: '120 тонн/час',
      tankVolume: '18 000 л',
      weight: '26 500 кг',
      width: '13.9 м'
    },
    features: ['Интеллектуальная система управления', 'GPS-навигация', 'Автопилот CEMOS']
  },
  {
    id: 2,
    rank: 2,
    name: 'John Deere S790',
    manufacturer: 'John Deere',
    image: 'https://cdn.poehali.dev/files/081aeef9-f3ba-4d41-be7d-e340a44e489d.jpg',
    price: '22 800 000 ₽',
    specs: {
      power: '765 л.с.',
      capacity: '110 тонн/час',
      tankVolume: '16 800 л',
      weight: '25 200 кг',
      width: '13.7 м'
    },
    features: ['ProDrive трансмиссия', 'Система Active Terrain Adjustment', 'Камеры 360°']
  },
  {
    id: 3,
    rank: 3,
    name: 'Case IH Axial-Flow 9250',
    manufacturer: 'Case IH',
    image: 'https://cdn.poehali.dev/projects/ee11ee8e-1f9a-44dd-b331-f2270ec54b98/files/d4bb4564-c955-41df-b1fd-2ad0f7ed7125.jpg',
    price: '21 200 000 ₽',
    specs: {
      power: '730 л.с.',
      capacity: '105 тонн/час',
      tankVolume: '16 100 л',
      weight: '24 800 кг',
      width: '13.5 м'
    },
    features: ['Роторная система обмолота', 'AFS Connect телематика', 'Luxury кабина']
  },
  {
    id: 4,
    rank: 4,
    name: 'New Holland CR11.90',
    manufacturer: 'New Holland',
    image: 'https://cdn.poehali.dev/projects/ee11ee8e-1f9a-44dd-b331-f2270ec54b98/files/9b027051-bdf9-4b59-9f1d-5668d323bc82.jpg',
    price: '20 500 000 ₽',
    specs: {
      power: '700 л.с.',
      capacity: '100 тонн/час',
      tankVolume: '15 500 л',
      weight: '24 000 кг',
      width: '13.2 м'
    },
    features: ['Twin Rotor система', 'IntelliSteer автопилот', 'OptiSpeed система']
  },
  {
    id: 5,
    rank: 5,
    name: 'Fendt IDEAL 10T',
    manufacturer: 'Fendt',
    image: 'https://cdn.poehali.dev/projects/ee11ee8e-1f9a-44dd-b331-f2270ec54b98/files/fc568fb2-3215-4620-8365-0a8c7285fddf.jpg',
    price: '19 800 000 ₽',
    specs: {
      power: '675 л.с.',
      capacity: '95 тонн/час',
      tankVolume: '15 000 л',
      weight: '23 500 кг',
      width: '13.0 м'
    },
    features: ['IDEALharvest система', 'FendtONE управление', 'Гибридный молотильный барабан']
  }
];

const Index = () => {
  const combineRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const scrollToNext = (currentId: number) => {
    const nextId = currentId + 1;
    if (nextId <= combines.length) {
      combineRefs.current[nextId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const scrollToPrevious = (currentId: number) => {
    const prevId = currentId - 1;
    if (prevId >= 1) {
      combineRefs.current[prevId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-4">
            <Icon name="Tractor" size={48} className="text-primary" />
            <Badge variant="outline" className="text-lg px-4 py-1">ТОП-5</Badge>
          </div>
          <h1 className="text-6xl font-bold mb-4">Крупнейшие комбайны в мире</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Самые мощные и производительные зерноуборочные комбайны 2025 года. 
            Полные технические характеристики и актуальные цены.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="space-y-8">
          {combines.map((combine) => (
            <Card 
              key={combine.id} 
              ref={(el) => { combineRefs.current[combine.id] = el; }}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary-foreground">
                        {combine.rank}
                      </span>
                    </div>
                    <div className="flex-1">
                      <Badge className="mb-2">{combine.manufacturer}</Badge>
                      <h2 className="text-3xl font-bold mb-2">{combine.name}</h2>
                      <div className="flex items-center gap-2 text-3xl font-bold text-primary">
                        <Icon name="Banknote" size={28} />
                        {combine.price}
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-xl p-6 space-y-3">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Icon name="Settings" size={20} />
                      Технические характеристики
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Icon name="Zap" size={18} className="text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">Мощность</div>
                          <div className="font-semibold">{combine.specs.power}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Icon name="Gauge" size={18} className="text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">Производительность</div>
                          <div className="font-semibold">{combine.specs.capacity}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Icon name="Droplet" size={18} className="text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">Бункер</div>
                          <div className="font-semibold">{combine.specs.tankVolume}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Icon name="Weight" size={18} className="text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">Масса</div>
                          <div className="font-semibold">{combine.specs.weight}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 col-span-2">
                        <Icon name="Ruler" size={18} className="text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">Ширина жатки</div>
                          <div className="font-semibold">{combine.specs.width}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Star" size={18} />
                      Особенности
                    </h3>
                    <ul className="space-y-2">
                      {combine.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Icon name="CheckCircle2" size={16} className="text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3 pt-4">
                    {combine.rank < combines.length ? (
                      <Button className="flex-1" onClick={() => scrollToNext(combine.id)}>
                        <span>Далее</span>
                        <Icon name="ChevronDown" size={18} className="ml-2" />
                      </Button>
                    ) : (
                      <Button className="flex-1" onClick={() => combineRefs.current[1]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
                        <Icon name="ArrowUp" size={18} className="mr-2" />
                        В начало
                      </Button>
                    )}
                    {combine.rank > 1 ? (
                      <Button variant="outline" onClick={() => scrollToPrevious(combine.id)}>
                        <Icon name="ChevronUp" size={18} className="mr-2" />
                        Вернуться
                      </Button>
                    ) : (
                      <Button variant="outline" onClick={() => combineRefs.current[combines.length]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
                        <Icon name="ArrowDown" size={18} className="mr-2" />
                        В конец
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="relative group">
                    <img
                      src={combine.image}
                      alt={combine.name}
                      className="w-full h-auto object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-primary/5 rounded-2xl p-8 text-center">
          <Icon name="Info" size={48} className="mx-auto mb-4 text-primary" />
          <h3 className="text-2xl font-bold mb-3">Нужна консультация?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Наши специалисты помогут подобрать оптимальный комбайн под ваши задачи и условия работы
          </p>
          <Button size="lg">
            <Icon name="MessageCircle" size={20} className="mr-2" />
            Получить консультацию
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;