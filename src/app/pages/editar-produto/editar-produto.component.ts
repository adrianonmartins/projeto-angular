import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProdutos } from 'src/app/interfaces/produtos';
import { ProdutosService } from 'src/app/service/produtos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent {
  produtoForm: Object|any;

  constructor(
    private produtosService: ProdutosService, private router: Router, private route: ActivatedRoute ) {}

  ngOnInit(): void {

    this.produtoForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      preco: new FormControl('', Validators.required),
      codigoBarras: new FormControl('', Validators.required)
    });
  
 
  }

  salvar(){
    const nomeControl = this.produtoForm.get('nome');
    const codigoBarrasControl = this.produtoForm.get('codigoBarras');
    const precoControl = this.produtoForm.get('preco');

    if (codigoBarrasControl && precoControl) {
      const produto: Partial<IProdutos> = {
        nome: nomeControl.value ? nomeControl.value : undefined,
        codigoBarras: codigoBarrasControl.value ? +codigoBarrasControl.value : undefined,
        preco: precoControl.value ? +precoControl.value : undefined
      };

      console.log(produto);

      this.produtosService.cadastrarProdutos(produto).subscribe(
        (result) => {
          Swal.fire('Confirmado', 'Produto editado com sucesso', 'success');
          this.router.navigate(['/produtos']);
          console.log(result);
        },
        (error) => {
          const { message } = error;
          console.error(error);
          Swal.fire('ALGO ESTÁ ERRADO', message, 'error');
        }
      );
    } else {
      Swal.fire('ALGO ESTÁ ERRADO', 'error');
    }
  }    
}
