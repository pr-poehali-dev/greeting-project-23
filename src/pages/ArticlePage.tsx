import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: number;
  author: string;
  text: string;
  created_at: string;
}

interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  published_at: string;
  reading_time: number;
}

const ArticlePage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ author: '', text: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
    fetchComments();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/articles/${id}`);
      if (response.ok) {
        const data = await response.json();
        setArticle(data);
      }
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments/${id}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.author.trim() || !newComment.text.trim()) {
      toast({
        title: "Заполните все поля",
        description: "Укажите имя и текст комментария",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          article_id: id,
          author: newComment.author,
          text: newComment.text
        })
      });

      if (response.ok) {
        toast({
          title: "Комментарий добавлен",
          description: "Ваш комментарий успешно опубликован"
        });
        setNewComment({ author: '', text: '' });
        fetchComments();
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось опубликовать комментарий",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Статья не найдена</h2>
          <Link to="/">
            <Button variant="outline">Вернуться к списку статей</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="ArrowLeft" size={20} />
            <span>Все статьи</span>
          </Link>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-6 mb-12">
          <h1 className="text-5xl font-bold leading-tight">{article.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{article.author}</span>
            <span>•</span>
            <span>{new Date(article.published_at).toLocaleDateString('ru-RU', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
            <span>•</span>
            <span>{article.reading_time} мин чтения</span>
          </div>
        </div>

        <div className="prose prose-lg max-w-none mb-20 leading-relaxed text-lg">
          {article.content.split('\n').map((paragraph, index) => (
            paragraph.trim() && <p key={index} className="mb-6">{paragraph}</p>
          ))}
        </div>

        <div className="border-t border-border pt-16">
          <h2 className="text-3xl font-semibold mb-8">Комментарии ({comments.length})</h2>

          <Card className="p-8 mb-12 bg-muted/30">
            <form onSubmit={handleSubmitComment} className="space-y-6">
              <div>
                <Input
                  placeholder="Ваше имя"
                  value={newComment.author}
                  onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                  className="bg-background"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Ваш комментарий"
                  value={newComment.text}
                  onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                  rows={4}
                  className="bg-background resize-none"
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Опубликовать комментарий
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            {comments.map((comment) => (
              <Card key={comment.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="User" size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(comment.created_at).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-foreground leading-relaxed">{comment.text}</p>
                  </div>
                </div>
              </Card>
            ))}

            {comments.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Icon name="MessageSquare" size={48} className="mx-auto mb-4 opacity-50" />
                <p>Пока нет комментариев. Будьте первым!</p>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticlePage;
