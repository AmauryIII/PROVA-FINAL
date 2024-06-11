$(document).ready(function() {
    // Código Konami
    var konamiCode = '38384040373937396665';
    var inputSequence = '';
  
    $(document).keydown(function(e) {
        inputSequence += e.keyCode.toString();
        if (inputSequence === konamiCode) {
            executeLogoSpin();
            inputSequence = ''; // Reset the sequence after successful entry
        } else if (!konamiCode.startsWith(inputSequence)) {
            inputSequence = ''; // Reset the sequence if wrong keys are pressed
        }
    });
  
    function executeLogoSpin() {
        $('img[alt="LOGO"]').css({ 'transition': 'transform 2s', 'transform': 'rotate(360deg)' });
        setTimeout(function() {
            $('img[alt="LOGO"]').css('transform', '');
        }, 2000);
    }
  
    // Alternância de tema claro e escuro
    $('#themeToggle').click(function() {
        $('body').toggleClass('light-theme dark-theme');
        var theme = $('body').hasClass('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        updateThemeIcons();
    });
  
    function updateThemeIcons() {
        if ($('body').hasClass('dark-theme')) {
            $('.fa-moon').addClass('d-none');
            $('.fa-sun').removeClass('d-none');
        } else {
            $('.fa-sun').addClass('d-none');
            $('.fa-moon').removeClass('d-none');
        }
    }
  
    // Set initial theme on page load
    if (localStorage.getItem('theme') === 'dark') {
        $('body').addClass('dark-theme').removeClass('light-theme');
    } else {
        $('body').addClass('light-theme').removeClass('dark-theme');
    }
    updateThemeIcons();
  
    // Modal de seleção de assentos
    $('#filmes .card a, #filmes2 .card a').click(function(event) {
        event.preventDefault(); 
        $('#modalSelecaoAssentos').modal('show'); 
    });
  
    
    function gerarPoltronas() {
        const assentosCinema = $('#assentosCinema');
        assentosCinema.empty(); 
        let total = 0; 
  
        for (let i = 0; i < 3; i++) { 
            const fileira = $('<div>').addClass('d-flex justify-content-center mb-2');
            for (let j = 0; j < 6; j++) { 
                const poltrona = $('<button>').addClass('btn border me-1 poltrona');
                poltrona.html(`<i class="fa-solid fa-couch fa-xl"></i><span class="poltrona-numero">${i * 6 + j + 1}</span>`);
                poltrona.on('click', function() {
                    $(this).toggleClass('btn-success'); 
                    const valorPoltrona = 25.00;
                    if ($(this).hasClass('btn-success')) {
                        total += valorPoltrona; 
                    } else {
                        total -= valorPoltrona; 
                    }
                    $('#total').text(`Total: R$${total.toFixed(2)}`); 
                });
                fileira.append(poltrona);
            }
            assentosCinema.append(fileira);
        }
    }
  
    
    $('#modalSelecaoAssentos').on('show.bs.modal', function() {
        gerarPoltronas(); 
    });
  
    
    $('#modalSelecaoAssentos').on('hidden.bs.modal', function() {
        $('#total').text('Total: R$0.00');
    });
  
    
    $('#confirmarSelecao').click(function() {
        
        var poltronasSelecionadas = [];
        $('.poltrona.btn-success').each(function() {
            poltronasSelecionadas.push($(this).find('.poltrona-numero').text());
        });
        localStorage.setItem('poltronasSelecionadas', JSON.stringify(poltronasSelecionadas));
        
        window.location.href = 'carrinho.html';
    });
});
