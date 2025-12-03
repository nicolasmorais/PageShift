"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  text: string;
  time: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials = ({ testimonials }: TestimonialsProps) => {
  return (
    <section className="mb-12">
      <h3 className="text-3xl font-bold text-center mb-8">
        Veja o que quem já está usando o protocolo diz:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="italic mb-4">"{testimonial.text}"</p>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <p className="font-bold text-gray-800 dark:text-gray-200">
                  {testimonial.name}
                </p>
                <span>{testimonial.time}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};