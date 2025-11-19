import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  published_at: string;
  reading_time: number;
}

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles');
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h1 className="text-6xl font-bold mb-4">Блог</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Статьи о технологиях, дизайне и разработке
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="space-y-12">
          {articles.map((article) => (
            <Link key={article.id} to={`/article/${article.id}`}>
              <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <div className="space-y-4">
                  <h2 className="text-3xl font-semibold group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4">
                    <div className="flex items-center gap-2">
                      <Icon name="User" size={16} />
                      <span>{article.author}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <Icon name="Calendar" size={16} />
                      <span>
                        {new Date(article.published_at).toLocaleDateString('ru-RU', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={16} />
                      <span>{article.reading_time} мин</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}

          {articles.length === 0 && (
            <div className="text-center py-20">
              <Icon name="FileText" size={64} className="mx-auto mb-6 text-muted-foreground/50" />
              <h3 className="text-2xl font-semibold mb-2">Пока нет статей</h3>
              <p className="text-muted-foreground">Скоро здесь появятся интересные материалы</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
