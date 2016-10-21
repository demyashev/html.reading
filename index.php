<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>All files</title>
</head>
<body>
    <ol>

        <?php 

        if ($handle = opendir('.')) {

            while (false !== ($entry = readdir($handle))) {

                if ($entry != "." && $entry != ".." && $entry != "index.php" && $entry != "public") {

                    echo "<li><a href=\"$entry\">$entry</a></li>";
                }
            }

            closedir($handle);
        }

        ?>
    </ol>
</body>
</html>

