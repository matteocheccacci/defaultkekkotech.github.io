<div class="container mt-5 pt-5 pb-5">
    <div class="row">
        <div class="col-lg-6 offset-lg-3">
            <?php
            // Controllo invio
            if (isset($_GET['invio'])) {
                if ($_GET['invio'] == "ok") {
            ?>
                    <div class="alert alert-success text-center" role="alert">
                        Grazie per averci scritto. Risponderemo entro 24 ore
                    </div>
                <?php
                } else {
                ?>
                    <div class="alert alert-danger text-center" role="alert">
                        Si è verificato un errore
                    </div>
            <?php
                }
            }
            ?>

            <h2 class=" text-center">Contatti</h2>

            <form action="/functions/send.php" method="post">
                <div class="mb-3">
                    <label for="nome" class="form-label">Nome</label>
                    <input name="nome" type="text" class="form-control" id="nome" aria-describedby="nome">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input name="email" type="email" class="form-control" id="email" aria-describedby="email">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Messaggio</label>
                    <textarea name="messaggio" id="" class="form-control" cols="30" rows="10"></textarea>
                </div>
                <input type="submit" class="btn btn-primary"></input>
            </form>

        </div>
    </div>
</div>