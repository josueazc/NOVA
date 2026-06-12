import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';
import Badge from './Badge';
import Avatar from './Avatar';
import EmptyState from './EmptyState';
import { ToastProvider, useToast } from './Toast';

describe('Button', () => {
  it('renderiza y dispara onClick', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Publicar</Button>);
    fireEvent.click(screen.getByRole('button', { name: /publicar/i }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('se deshabilita cuando loading', () => {
    render(<Button loading>Guardando</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

describe('Badge', () => {
  it('muestra el contenido', () => {
    render(<Badge tone="blue">Verificado</Badge>);
    expect(screen.getByText('Verificado')).toBeInTheDocument();
  });
});

describe('Avatar', () => {
  it('muestra iniciales cuando no hay imagen', () => {
    render(<Avatar name="Laura Fernández" />);
    expect(screen.getByText('LF')).toBeInTheDocument();
  });
});

describe('EmptyState', () => {
  it('muestra título y descripción', () => {
    render(<EmptyState title="Sin datos" description="Nada que mostrar." />);
    expect(screen.getByText('Sin datos')).toBeInTheDocument();
    expect(screen.getByText('Nada que mostrar.')).toBeInTheDocument();
  });
});

describe('Toast', () => {
  const Trigger = () => {
    const toast = useToast();
    return <button onClick={() => toast.success('Cambios guardados.')}>go</button>;
  };

  it('muestra y descarta toasts', () => {
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('go'));
    expect(screen.getByText('Cambios guardados.')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Cerrar aviso'));
    expect(screen.queryByText('Cambios guardados.')).not.toBeInTheDocument();
  });
});
