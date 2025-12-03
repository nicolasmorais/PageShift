"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf } from "lucide-react";

const ingredients = [
  {
    name: "Folha de Chlorella Vulgaris",
    desc: "Desinflama o tecido pancreático e estimula a regeneração.",
  },
  {
    name: "Folha de Feno Grego",
    desc: "Aumenta a sensibilidade à insulina.",
  },
  {
    name: "Folha de Amora",
    desc: "Retarda a absorção de carboidratos.",
  },
  {
    name: "Folha de Gymnema Sylvestre",
    desc: 'Conhecida como "destruidora de açúcar".',
  },
  {
    name: "Folha de Pata de Vaca",
    desc: "Alto poder hipoglicemiante.",
  },
  {
    name: "Canela do Ceilão",
    desc: "Completa a sinergia metabólica.",
  },
];

export const Solution = () => {
  return (
    <section className="mb-12 text-center">
      <h3 className="text-3xl font-bold mb-2">
        O pâncreas de um diabético tipo 2 não está morto.
      </h3>
      <h3 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-6">
        Ele está adormecido.
      </h3>
      <p className="text-lg mb-8">
        Existe uma forma de estimular essas células a voltarem a funcionar —
        sem química, sem agressão ao organismo.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            O Chá Japonês Regenerativo — A base do protocolo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-lg">
            Uma fórmula ancestral japonesa preparada com uma combinação
            precisa de 6 folhas terapêuticas orientais.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            {ingredients.map((herb) => (
              <div
                key={herb.name}
                className="flex flex-col gap-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <Leaf className="text-green-500 h-5 w-5 flex-shrink-0" />
                  <span className="font-bold">{herb.name}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {herb.desc}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};