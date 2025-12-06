"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function AdvertorialEditorPage() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Por favor, insira um nome para o advertorial.");
      return;
    }
    if (!content.trim() || content === '<p><br></p>') {
      toast.error("O conteúdo não pode estar vazio.");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/advertorials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, content }),
      });

      if (!response.ok) {
        throw new Error('Falha ao salvar o advertorial');
      }
      
      const result = await response.json();
      toast.success(`Advertorial "${result.advertorial.name}" salvo com sucesso!`);
      setName('');
      setContent('');

    } catch (error) {
      toast.error("Ocorreu um erro ao salvar. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Toaster richColors />
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Editor de Advertorial</CardTitle>
            <CardDescription>
              Crie um novo advertorial usando o editor de texto abaixo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="advertorial-name">Nome do Advertorial</Label>
              <Input 
                id="advertorial-name"
                placeholder="Ex: Chá Japonês V4"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Este nome é para sua organização interna.
              </p>
            </div>
            <div>
              <Label>Conteúdo</Label>
              <div className="bg-white rounded-md text-black">
                <ReactQuill 
                  theme="snow" 
                  value={content} 
                  onChange={setContent}
                  modules={quillModules}
                  style={{ height: '400px', marginBottom: '4rem' }}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
             <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Salvando..." : "Salvar Novo Advertorial"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}